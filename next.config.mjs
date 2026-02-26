/** @type {import('next').NextConfig} */
const nextConfig = {
    // Expose NEXT_PUBLIC_ env vars are automatically included
    // Allow images from any source (for avatars etc.)
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**' },
        ],
    },
    // Suppress specific hydration warnings from xterm
    reactStrictMode: false,
};

export default nextConfig;
