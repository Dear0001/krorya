/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',

                pathname: '/img/*',
            },
        ],
        domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com", "scontent.fpnh11-2.fna.fbcdn.net"],
    },
};

export default nextConfig;
