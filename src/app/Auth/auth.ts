// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
//
// export const {handler: {GET, POST}, auth,
//     signIn,
//     signOut
// } = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 const res = await fetch(`${process.env.SPRING_API_UR}/auth/login`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(credentials),
//                 });
//
//                 const user = await res.json();
//                 if (!res.ok) throw new Error(user.message);
//
//                 return user;
//             },
//         }),
//     ],
//     session: { strategy: "jwt" },
//     secret: process.env.NEXTAUTH_SECRET,
// });
