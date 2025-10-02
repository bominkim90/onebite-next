// 브라우저의 쿼리스트링, params 는 페이지 컴포넌트의 props로 전달 됨
// 컴포넌트 함수에 async 를 붙일 수 있는 이유
// => React 18 버전 : Server Component 기능 (서버 측에서 사전 렌더링 때 딱 한번 실행)
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  console.log("q: ", q);

  return <div>Search 페이지</div>;
}
