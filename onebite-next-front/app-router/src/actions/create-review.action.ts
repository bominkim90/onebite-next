"use server";

import { delay } from "@/util/delay";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(state: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  console.log(bookId, content, author);

  // 예외 처리
  if (!bookId || !content || !author)
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };

  // 리뷰 등록 api 호출
  try {
    await delay(3000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    console.log(response.status);
    // 리뷰 등록 -> 리뷰 리스트 컴포넌트 재검증(리렌더링)
    // revalidatePath(인수) 함수 안의 인수로 페이지 URL을 넣는다
    // URL에 매칭되는 page 컴포넌트를 Next.js 에 재생성 요청을 보낸다 => 재생성 후 클라이언트에 보냄
    // 사용자는 리뷰 등록 후 바로 등록된 리뷰를 보게 됨
    // revalidatePath(`/book/${bookId}`);
    // '서버' 측 (서버 컴포넌트) 에서만 호출 할 수 있음
    // 해당 페이지의 데이터페칭 cache를 모두 무효화(삭제) 시킨다
    // 정적페이지의 풀라우트 캐싱 cache 데이터도 삭제 시킨다 (새롭게 갱신 시켜주지는 않는다)

    // 1. 특정 주소에 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 주소에 해당하는 모든 동적 페이지를 재검증 (/book/[id])
    // revalidatePath(`/book/${bookId}`, "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지를 재검증
    // revalidatePath(`/(widt-searchbar)`, "layout");

    // 4. 모든 데이터를 재검증
    // revalidatePath(`/`, "layout");

    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
    /* 데이터페칭 캐싱 예시) const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
        { next: { tags: [`review-${bookId}`] } }
      );
      이렇게 fetch로 tags 기준으로 데이터 캐싱을 했을 경우
      => revalidateTag(`review-${bookId}`)
      이렇게 특정 캐시값만 삭제할 수 있다.
    */
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${err}`,
    };
  }
}
