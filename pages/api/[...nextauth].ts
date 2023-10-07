import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {compare} from 'bcrypt';

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

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user.hashedPassword){
                    throw new Error('Email không tồn tại')
                }

                const isCorrectPassword = await compare(credentials.password,user.hashedPassword)

                if(!isCorrectPassword){
                    throw new Error('Password không chính xác')
                }

                return user;
            }
        })
    ],
    pages:{
        signIn:'/auth',
    },
    debug:process.env.NODE_ENV === 'development',
    session:{
        strategy:'jwt',
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET,
    },
    secret:process.env.NEXTAUTH_SECRET,
});