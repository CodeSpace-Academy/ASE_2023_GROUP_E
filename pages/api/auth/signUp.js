import run from "@/database/client";
import hashPassword from "../../../database/auth";

export default async function handler(req, res){

    if(req.method === 'POST'){

        const { username, email, password } = req.body

        //error handling
        if( !email || !password|| !username   ){
            res.status(400).json({ message: 'Invalid Input: fill all fields'})
            return;
        }

        if( username.includes(' ') ){
            res.status(400).json({ message: 'Username should not inlude spaces'})
        }

        if( !email.includes('@')){
            res.status(400).json({ message: 'Email should include @'})
        }

        if( !password.length >= 8 ){
            res.status(400).json({ message: 'Password should include atleast 8 characters'})
        }

        const client = await run()
        const db = client.db('authentication')

        /** 
         * checks if the email and Or username is already used.
         * If it is already in use, the sign up will fail
         * */ 
        const existingUserEmail = await db.collection('users').findOne({ email: email })
        const existingUsername = await db.collection('users').findOne({ username: username })

        //Notify customer that details are already in use
        if(existingUserEmail){
            res.status(400).json({ message : 'Email is already used'})
            client.close()
            return;
        }

        //Notify customer that details are already in use
        if(existingUsername){
            res.status(400).json({ message : 'username is already in use'})
            client.close()
            return;
        }

         /**
         * This is a password that has been encrypted,
         * before sent to database
         */
        const hashedPassword = await hashPassword(password)

        /**
         * when all checks are successful customer details are then sent to database
         */
        await db.collection('users').insertOne({
            username: username,
            email: email,
            password: hashedPassword
        })

        res.status(201).json({ message: `Welcome ${username}`})
        client.close()
    }
}