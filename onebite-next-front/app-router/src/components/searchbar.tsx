"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";

export default function Searchbar() {
  const router = useRouter();
  // App Router 방식 - 클라이언트 컴포넌트 - 쿼리스트링 가져오는 방법
  // useSearchParams 훅 이용 => 빌드 타임(서버 단계) 에선 이 값을 알 수가 없음
  // Suspense 기능
  // “아직 준비되지 않은 비동기 데이터가 있을 때, 그 부분만 잠깐 fallback으로 대체해두는 기능.”
  // Suspense 경계로 구분해두면 사전렌더링에선 배제되고 “이 부분은 클라이언트에서 렌더링”으로 처리.
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
