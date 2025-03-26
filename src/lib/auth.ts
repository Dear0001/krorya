import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            // Only store basic user info in the token
            if (user) {
                token.user = {
                    email: user.email,
                    name: user.name,
                    image: user.image
                };
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};