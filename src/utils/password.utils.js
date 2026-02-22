import bcrypt from "bcryptjs";
import { hash } from "crypto";

export const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async(password, hashPassword)=>{
    return bcrypt.compare(password, hashPassword);
}