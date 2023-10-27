import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/database/auth";
import {client} from "@/database/client";
import NextAuth from "next-auth/next";

export default NextAuth({

    session : {
        jwt: true
    },
    
    providers: [
        CredentialsProvider({

            async authorize(credentials) {
                
                const userscollection = client.db('authentication').collection('users')
                const user = await userscollection.findOne({ email: credentials.email})
                
                if (!user){
                    throw new Error('User not found!')
                }
                
                const isValid = await verifyPassword(credentials.password, user.password)

                if(!isValid){
                    throw new Error('Incorrect Password')
                }
                return { email: [user.email, user.username] }
            }
        })
    ],
    

})