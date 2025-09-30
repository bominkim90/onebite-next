import "@/styles/globals.css";
import type { AppProps } from "next/app";

// 모든 페이지 컴포넌트의 부모 컴포넌트
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
