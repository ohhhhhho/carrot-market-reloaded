import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        //해당 url의 이미지를 최적화 (이미지 최적화 제어 가능)
        hostname:''
      }
    ]
  }
};

export default nextConfig;
