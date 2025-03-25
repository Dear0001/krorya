import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
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
            // Only pass basic user info to the session
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};