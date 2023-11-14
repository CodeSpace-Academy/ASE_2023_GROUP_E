import client from "../client";
import hashPassword from "./protectPassword";

export default async function signUpData(username, email, password){

    const db = client().db('authentication')

    /** 
     * checks if the email and Or username is already used.
     * If it is already in use, the sign up will fail
     * */ 
    const existingUserEmail = await db.collection('users').findOne({ email: email })
    const existingUsername = await db.collection('users').findOne({ username: username })

    //Notify customer that details are already in use
    if(existingUserEmail){
        res.status(400).json({ message : 'Email is already used'})
        return;
    }

    //Notify customer that details are already in use
    if(existingUsername){
        res.status(400).json({ message : 'username is already in use'})
        return;
    }

    /**
     * This is a password that has been encrypted,
     * before sent to database
     */
    const hashedPassword = await hashPassword(password)

    /**
     * when all checks are successful user details are then sent to database
     */
    await db.collection('users').insertOne({
        username: username,
        email: email,
        password: hashedPassword
    })
}