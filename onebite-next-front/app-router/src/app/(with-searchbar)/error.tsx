// Erorr 컴포넌트를 클라이언트 컴포넌트로 만드는 이유는
// 서버든 클라이언트 측 모두 대응 할 수 있도록 => 클라이언트 컴포넌트로 만들어야함
// 클라이언트 컴포넌트는 서버 | 클라이언트 양쪽에서 실행하기 때문에
"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// 스트리밍 파일 (loading.tsx) 과 같이 Error 객체가 throw될 때 Next.js 단계에서 감지하여 처리해줌
// Next에서 Props로 에러 정보 전달해줌
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h3>with-searchbar에서 오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴(사전렌더링)
            // => 이 상태는 아직 에러 컴포넌트가 없어지지 않음
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
