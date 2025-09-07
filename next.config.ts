import type { NextConfig } from "next";
import "newrelic";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", 'picsum.photos'],
  },
};

export default nextConfig;
