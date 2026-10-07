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
      {
        protocol: "https",
        hostname: "site-1900478.mozfiles.com",
        pathname: "/files/1900478/catitems/**",
      },
      {
        protocol: "https",
        hostname: "jwckebgsroirjpsffshb.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
