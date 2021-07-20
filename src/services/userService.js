import {create, find} from "../repositories/userRepository.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

async function signUpUser(name,email,password){
    const hashedPassword = bcrypt.hashSync(password, 12);

    return await create(name,email,hashedPassword)
}

async function verifyEmail(email){
    return await find(email)
}

async function verifyAuthenticity(user, password){
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return true
    }
}

async function createToken(user){
    return  jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET);
}

export {signUpUser, verifyEmail, verifyAuthenticity, createToken}