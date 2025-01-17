import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "@/servises/auth.service";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const userInfo = {
                    email: credentials.email,
                    password: credentials.password,
                };

                try {
                    const login = await loginService(userInfo);

                    // Log the login service response
                    console.log("Login response from loginService:", login);

                    if (login.payload) {
                        return {
                            id: login.payload.email,
                            email: login.payload.email,
                            name: login.payload.full_name,
                            role: login.payload.role,
                            access_token: login.payload.access_token,
                            refresh_token: login.payload.refresh_token,
                        };
                    } else {
                        throw new Error("Invalid credentials");
                    }
                } catch (error) {
                    console.error("Error during login:", error);
                    throw new Error(error instanceof Error ? error.message : "Login failed");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Log the user and token during the JWT callback
            console.log("JWT callback - user:", user);
            console.log("JWT callback - token before merge:", token);

            if (user) {
                // Merge user data into the token
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;

                // Log the token after merge
                console.log("JWT callback - token after merge:", token);
            }
            return token;
        },
        async session({ session, token }) {
            // Log the token and session during the session callback
            console.log("Session callback - token:", token);
            console.log("Session callback - session before update:", session);

            // Attach user data to the session
            session.user = {
                id: token.id,
                email: token.email,
                name: token.name,
                role: token.role,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
            };

            // Log the session after the update
            console.log("Session callback - session after update:", session);

            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default authOptions;
