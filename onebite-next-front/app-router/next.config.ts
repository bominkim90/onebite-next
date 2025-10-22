import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true, // 데이터 fetch 시 마다 모두 로깅
    },
  },
  // Next.js 서버 안에 들어있지 않고, 외부 서버로 가져오는 이미지는 Next.js에서 안전하지 않다고 차단함
  // => 그래서 여기에서 도메인을 등록해주면 외부 도메인 이미지라도 최적화 가능
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
};

export default nextConfig;
