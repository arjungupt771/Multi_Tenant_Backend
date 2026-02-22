import {Organization} from "../models/organization.model.js";
import {User} from "../models/user.model.js";
import { generateToken } from "../utils/token.utils.js";
import { hashPassword } from "../utils/password.utils.js";
import { ROLES } from "../constants/roles.js";

// export const signupService = async({orgName, email, password})=>{
//     // create organization
//     const organization = await Organization.create({
//         name: orgName
//     })
//     //create admin user
//     const hashedPassword = await hashPassword(password);
//     const user = await User.create({
//         email,
//         password: hashedPassword,
//         role: ROLES.ADMIN,
//         organization: organization._id
//     });
//     // generate token
//     const token =generateToken({
//         userId:user._id,
//         organizationId: organization._id,
//         role: user.role
//     });

//     return {
//         token,
//         user:{
//             id: user._id,
//             email: user.email,
//             role: user.role
//         },
//         organization:{
//             id: organization._id,
//             name: organization.name
//         }
//     };
// };



export const signupService = async ({ orgName, email, password }) => {
    // 1. create organization
    const organization = await Organization.create({
        name: orgName
    });

    // 2. hash password
    const hashedPassword = await hashPassword(password);

    // 3. create admin user (FIXED)
    const user = await User.create({
        name: orgName,                  // ✅ REQUIRED FIELD
        email,
        password: hashedPassword,
        role: ROLES.ADMIN,
        organizationId: organization._id // ✅ CORRECT FIELD NAME
    });

    // 4. generate token
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
