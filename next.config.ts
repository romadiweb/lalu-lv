import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/Gs507EVZiOc/**",
      },
      {
        protocol: "https",
        hostname: "lastatic.ams3.cdn.digitaloceanspaces.com",
        pathname: "/2013/10/g1/Tirdzins_KM_72.jpg",
      },
    ],
  },
};

export default nextConfig;
