import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

// 모든 페이지 컴포넌트의 부모 컴포넌트
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClickButton = () => {
    console.log("/test 페이지로 이동 버튼 click");
    router.push("/test"); // 페이지 단순 이동
    router.replace("/test"); // 뒤로가기 방지 이동
    router.back(); // 뒤로가기
  };

  useEffect(() => {
    // Link 컴포넌트 이외에 프로그래머틱하게 이동되는 경로(컴포넌트)의 js는 프리패치가 되지 않는다.
    // 만약 이 경우에도 프리패치 하고 싶다면 useRouter()의 prefetch를 사용하면 된다.
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        {/* Link 컴포넌트에서 프리패치를 명시적으로 해제시킬 수 있다. */}
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        &nbsp;
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
