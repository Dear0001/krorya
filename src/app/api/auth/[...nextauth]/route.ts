import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "@/servises/auth.service";

export const authOptions: NextAuthOptions = {
    providers: [
        // Login by email and password
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
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
                    if (login.user) {
                        return {
                            id: login.user.id,
                            email: login.user.email,
                            name: login.user.name,
                            role: login.user.role,
                        };
                    } else {
                        throw new Error("Invalid credentials");
                    }
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Login failed");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = { ...token, ...user }; // Merge user data into the token
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login", // Custom sign-in page
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };