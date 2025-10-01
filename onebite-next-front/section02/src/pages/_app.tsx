import GlobalLayout from "@/components/layout/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

// 모든 페이지 컴포넌트의 부모 컴포넌트 (root 컴포넌트)
export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <div>
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    </div>
  );
}
