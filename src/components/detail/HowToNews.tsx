import { NewsImgCard } from "../main/NewsImgCard";

export function HowtoNews() {
  return (
    <article className="mt-[12px] flex w-full flex-col items-center gap-[11px] bg-white pt-[30px]">
      <p className="w-[337px] text-[20px] font-bold leading-[140%] text-[#2A2A2A]">
        이런 뉴스도 한 번 봐봐!
      </p>
      <>
        {/* 주제 */}
        <NewsImgCard title="이런 주제는 어때?" />
        {/* 감정 */}
        <NewsImgCard title="이런 감정은 어때?" />
      </>
    </article>
  );
}
