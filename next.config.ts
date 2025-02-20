/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fakestoreapi.com",
                pathname: "/img/*",
            },
            {
                protocol: "https",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "127.0.0.1",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "scontent.fpnh11-2.fna.fbcdn.net",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8080",
                pathname: "/api/v1/fileView/*",
            },
        ],
    },
};

export default nextConfig;