/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fakestoreapi.com",
                pathname: "/img/*",
            },
        ],
        domains: [
            "localhost", // Allow images from local API
            "127.0.0.1", // Include if using IP-based access
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "scontent.fpnh11-2.fna.fbcdn.net",
        ],
    },
};

export default nextConfig;
