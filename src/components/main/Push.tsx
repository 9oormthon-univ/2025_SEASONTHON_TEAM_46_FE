import { NewsImgCard } from "./NewsImgCard";
import api from "../../hooks/api";
import { useEffect, useState } from "react";
import type { DataProps } from "../../types/DataProps";
import DefaultImg from "../../assets/images/default_test_img.png";

export function Push({ text }: { text: string }) {
  const [categoryNews, setCategoryNews] = useState<DataProps[]>([]);
  const [emotionNews, setEmotionNews] = useState<DataProps[]>([]);
  useEffect(() => {
    api.get("/api/news/1/recommendation/opposing-emotion").then((res) => {
      setCategoryNews(res.data);
      console.log(res.data, "1");
    });
    api.get("/api/news/3/recommendation/opposing-emotion").then((res) => {
      setEmotionNews(res.data);
    });
  }, []);
  const categoryNewsList = mapToNewsImgCardData(categoryNews);
  const emotionNewsList = mapToNewsImgCardData(emotionNews);

  return (
    <article className="mt-[33px] w-[337px]">
      <p className="text-[20px] font-bold leading-[140%] text-[#2A2A2A]">
        {text || `건강한 뉴스 생활을 위해선\n균형 잡힌 정보가 필요해!`}
      </p>
      {/* 주제 */}
      <NewsImgCard topic="이런 주제는 어때?" newsList={categoryNewsList} />
      {/* 감정 */}
      <NewsImgCard topic="이런 감정은 어때?" newsList={emotionNewsList} />
    </article>
  );
}

function mapToNewsImgCardData(data: DataProps[]) {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.summary,
    imgSrc: item.thumbnail || DefaultImg,
    categories: item.categoryMeta,
    sentiment: item.sentimentMeta,
  }));
}
