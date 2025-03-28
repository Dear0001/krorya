const nextConfig = {
    images: {
        domains: ['img.freepik.com', 'aws-kshrd-final-project.s3.eu-central-1.amazonaws.com'],
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