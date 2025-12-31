/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                // pathname: "/dx8m9dy9d/image/upload/*",
            },
            {
                protocol: 'https',
                hostname: 'cdn-images-1.medium.com',
            }
        ]
    }
};

export default nextConfig;
