import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/database/authentication/protectPassword";
import NextAuth from "next-auth/next";
import nextAuthLogin from "@/database/authentication/nextAuthLogin";

export default NextAuth({

    session : {
        jwt: true
    },
    
    providers: [
        CredentialsProvider({

            async authorize(credentials) {
                
                const user = await nextAuthLogin(credentials)
                
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