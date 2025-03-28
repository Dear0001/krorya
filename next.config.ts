const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
            },
            // {
            //     protocol: 'http',
            //     hostname: 'localhost',
            //     port: '8080',
            //     pathname: '/api/v1/fileView/**',
            // },
        ],
    },
};

export default nextConfig;