import { useEffect, useState } from "react";
import { NewsImgCard } from "../main/NewsImgCard";
import {
  getOpposingEmotionNews,
  getOpposingCategoryNews,
  type RawRecommendedNews,
} from "../../api/report/getRecommendation";
import type { NewsItem } from "../../types/NewsItem";
import hotNewsThumb from "../../assets/images/hot_news1.png";
function toNewsImgItems(rows: RawRecommendedNews[]): NewsItem[] {
  return (rows ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    content: r.summary?.trim() || r.outlet || "",
    imgSrc: r.thumbnail || hotNewsThumb || "",
    category: r.categoryMeta?.text
      ? {
          text: r.categoryMeta.text,
          color: r.categoryMeta.color ?? "#979797",
          bgColor: r.categoryMeta.bgColor ?? "#ECECEC",
        }
      : null,
    sentiment: r.sentimentMeta?.text
      ? {
          text: r.sentimentMeta.text,
          color: r.sentimentMeta.color ?? "#979797",
          bgColor: r.sentimentMeta.bgColor ?? "#ECECEC",
        }
      : null,
  }));
}

export default function RecommendPage() {
  const [topicList, setTopicList] = useState<NewsItem[]>([]);
  const [emotionList, setEmotionList] = useState<NewsItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [oppCategory, oppEmotion] = await Promise.all([
          getOpposingCategoryNews(1),
          getOpposingEmotionNews(1),
        ]);
        setTopicList(toNewsImgItems(oppCategory));
        setEmotionList(toNewsImgItems(oppEmotion));
      } catch (e) {
        console.error(e);
        setTopicList([]);
        setEmotionList([]);
      }
    })();
  }, []);

  return (
    <div className="bg-white px-7 pb-[91px]">
      <h1 className="mt-[33px] w-[246px] text-[20px] font-bold leading-[28px] text-[#2A2A2A] [font-feature-settings:'liga'_off,'clig'_off]">
        건강한 뉴스소비 생활을 위해선
        <br />
        균형 잡힌 정보가 필요해!
      </h1>
      <NewsImgCard topic="이런 주제는 어때?" newsList={topicList} />
      <NewsImgCard topic="이런 감정은 어때?" newsList={emotionList} />
    </div>
  );
}
