// '/book/[id]' 경로 컴포넌트
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("id : ", id);
  return <div>book/{id} page 입니다.</div>;
}
