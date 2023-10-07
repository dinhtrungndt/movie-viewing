import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {compare} from 'bcrypt';

import prisma from '@/lib/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
    providers: [
        GithubProvider({
            clientId:process.env.GITHUB_ID || '',
            clientSecret:process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID || '',
            clientSecret:process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        FacebookProvider({
            clientId:process.env.FACEBOOK_CLIENT_ID || '',
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET || ''
        }),
        Credentials({
            id:'credentials',
            name:'Credentials',
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
    adapter: PrismaAdapter(prisma),
    session:{
        strategy:'jwt',
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET,
    },
    secret:process.env.NEXTAUTH_SECRET,
});