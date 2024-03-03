/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "utfs.io"
            }
        ]
    },
    experimental: {
        serverActions: true
    }
};

export default nextConfig;
