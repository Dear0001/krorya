import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.user = {
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            }
            if (account) {
                token.provider = account.provider;
            }
            return token;
        },
        async session({ session, token }) {
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};