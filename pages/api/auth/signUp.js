import signUpData from "@/database/authentication/signUp";

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

        await signUpData(username, email, password)

        res.status(201).json({ message: `Welcome ${username}`})
    }
}