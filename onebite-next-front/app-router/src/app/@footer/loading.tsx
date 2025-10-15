// 특정 페이지(세그먼트) 컴포넌트에 스트리밍(로딩) 처리 를 하려면
// 해당 page.tsx (페이지 컴포넌트) 같은 경로에 loading.tsx 컴포넌트 작성만 해두면 된다.
// url 의 주소가 바뀔때만 이 방식이 적용된다.
// ex) 쿼리스트링이 변경될 때는 이 방식의 스트리밍이 적용되지 않는다. => Suspense 필요

export default function Loading() {
  return <div>Loading...</div>;
}
