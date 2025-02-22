const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/api/v1/fileView/*',
            },
        ],
    },
};

export default nextConfig;
