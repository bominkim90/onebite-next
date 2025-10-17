"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  // useActionState() 첫번째 인수 : form이 submit 됐을때 동작하는 액션 함수
  // 두번째 인수 : state의 기본값 (여기선 null)
  // state => 액션함수(여기선 리뷰삭제) 가 return 하는 값
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input hidden name="reviewId" defaultValue={reviewId} />
      <input hidden name="bookId" defaultValue={bookId} />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
