/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
            'res.cloudinary.com',
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
