import {Organization} from "../models/organization.model.js";
import {User} from "../models/user.model.js";
import { generateToken } from "../utils/token.utils.js";
import { hashPassword } from "../utils/password.utils.js";
import { ROLES } from "../constants/roles.js";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";


export const signupService = async ({ orgName, email, password }) => {
    // 1. Validate inputs before performing database writes.
    if (
        typeof orgName !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        const error = new Error("Organization name, email and password are required");
        error.statusCode = 400;
        throw error;
    }

    const normalizedOrgName = orgName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedOrgName.length < 2 || normalizedOrgName.length > 100) {
        const error = new Error("Organization name must be between 2 and 100 characters");
        error.statusCode = 400;
        throw error;
    }

    if (
        normalizedEmail.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
        const error = new Error("A valid email address is required");
        error.statusCode = 400;
        throw error;
    }

    if (password.length < 8 || password.length > 72) {
        const error = new Error("Password must be between 8 and 72 characters");
        error.statusCode = 400;
        throw error;
    }

    // 2. Hash before writing anything to the database.
    const hashedPassword = await hashPassword(password);

    let organization;
    let user;

    // 3. Create the organization and admin user atomically.
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            [organization] = await Organization.create(
                [{ name: normalizedOrgName }],
                { session }
            );

            [user] = await User.create(
                [{
                    name: normalizedOrgName,
                    email: normalizedEmail,
                    password: hashedPassword,
                    role: ROLES.ADMIN,
                    organizationId: organization._id
                }],
                { session }
            );
        });
    } finally {
        await session.endSession();
    }

    // 4. Generate the token only after the transaction succeeds.
    const token = generateToken({
        userId: user._id,
        organizationId: organization._id,
        role: user.role
    });

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        organization: {
            id: organization._id,
            name: organization.name
        }
    };
};


// ------------------------------------------------------------------

export const loginService = async ({ email, password, orgName }) => {
    if (
        typeof email !== "string" ||
        !email.trim() ||
        typeof password !== "string" ||
        password.length === 0
    ) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
    }

    if (orgName !== undefined && orgName !== null && typeof orgName !== "string") {
        const error = new Error("Organization name must be a string");
        error.statusCode = 400;
        throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const users = await User.find({
        email: normalizedEmail
    })
        .select("+password name email role organizationId")
        .populate("organizationId", "name");

    // Use a generic response for invalid credentials.
    const invalidCredentials = () => {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return error;
    };

    if (users.length === 0) {
        throw invalidCredentials();
    }

    // Identify accounts whose passwords match.
    const matchingUsers = [];

    for (const user of users) {
        if (await bcrypt.compare(password, user.password)) {
            matchingUsers.push(user);
        }
    }

    if (matchingUsers.length === 0) {
        throw invalidCredentials();
    }

    let user;

    if (orgName?.trim()) {
        const normalizedOrgName = orgName.trim().toLowerCase();

        const organizationMatches = matchingUsers.filter(
            candidate =>
                candidate.organizationId?.name?.trim().toLowerCase() ===
                normalizedOrgName
        );

        if (organizationMatches.length !== 1) {
            throw invalidCredentials();
        }

        user = organizationMatches[0];
    } else {
        if (matchingUsers.length > 1) {
            const error = new Error(
                "These credentials match multiple organizations. Enter your organization name to continue."
            );
            error.statusCode = 409;
            throw error;
        }

        user = matchingUsers[0];
    }

    if (!user.organizationId?._id) {
        throw invalidCredentials();
    }

    const token = generateToken({
        userId: user._id,
        organizationId: user.organizationId._id,
        role: user.role
    });

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        organization: {
            id: user.organizationId._id,
            name: user.organizationId.name
        }
    };
};
