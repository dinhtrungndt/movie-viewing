import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import prisma from '@/lib/prismadb'

export default NextAuth({
    providers: [
        Credentials({
            id:'creadentials',
            name:'Creadentials',
            credentials: {
                email:{
                    label:'Email',
                    type:'text',
                },
                password:{
                    label:'Password',
                    type:'password',
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Vui lòng nhập Email và Password')
                }

                const user = await prismadb
            }
        })
    ]
});