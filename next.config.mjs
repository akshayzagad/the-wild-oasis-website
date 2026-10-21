/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/cabins/app/auth/signin",
        destination: "/auth/signin",
        permanent: false,
      },
    ];
  },
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mogncmpwzzznvddputnn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "mogncmpwzzznvddputnn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabins-images/**",
      },
    ],
  },
};

export default nextConfig;
