import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true, // 데이터 fetch 시 마다 모두 로깅
    },
  },
};

export default nextConfig;
