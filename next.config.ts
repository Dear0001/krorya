const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
            },
            {
                protocol: 'https',
                hostname: 'aws-kshrd-final-project.s3.eu-central-1.amazonaws.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/api/v1/fileView/**',
            },
        ],
    },
};

export default nextConfig;