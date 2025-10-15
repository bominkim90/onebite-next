import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 클라이언트 라우터 캐시 확인용 */}
      {/* <div>{new Date().toLocaleString()}</div> */}

      {/* Suspense 경계로 구분해두면 사전렌더링에선 배제되고 “이 부분은 클라이언트에서 렌더링”으로 처리. */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
