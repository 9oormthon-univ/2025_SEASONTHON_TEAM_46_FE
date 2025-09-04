import { NewsImgCard } from "./NewsImgCard";
import { howtoNewsData } from "../../constant/newsImgCardData";

export function Push() {
  return (
    <article className="mt-[33px] w-[337px]">
      <p className="text-[20px] font-bold leading-[140%] text-[#2A2A2A]">{`건강한 뉴스 생활을 위해선\n균형 잡힌 정보가 필요해!`}</p>
      {/* 주제 */}
      <NewsImgCard topic="이런 주제는 어때?" newsList={howtoNewsData.topic} />
      {/* 감정 */}
      <NewsImgCard topic="이런 감정은 어때?" newsList={howtoNewsData.emotion} />
    </article>
  );
}
