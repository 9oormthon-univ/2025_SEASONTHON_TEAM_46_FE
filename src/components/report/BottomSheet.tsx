import { useEffect, useMemo, useState } from "react";
import { EMOTION_META, type EmotionKey } from "../../constant/emotionData";
import { Category } from "../common/Category";
import HotNewsCard from "../hot/HotNewsCard";
import hotNewsThumb from "../../assets/images/hot_news1.png";
import {
  getNewsBySentiment,
  type SentimentCode,
  type SentimentNewsItem,
} from "../../api/report/getNewsBySentiment";

type Props = {
  open: boolean;
  emotion: EmotionKey | null;
  onClose: () => void;
};

const emotionToSentiment: Record<EmotionKey, SentimentCode> = {
  희망: "HOPE_ENCOURAGE",
  재미: "FUN_INTEREST",
  분노: "ANGER_CRITICISM",
  불안: "ANXIETY_CRISIS",
  슬픔: "SAD_SHOCK",
  중립: "NEUTRAL_FACTUAL",
};

const categoryLabelMap: Record<string, string> = {
  POLITICS: "정치",
  SOCIETY: "사회",
  ECONOMY: "경제",
  INTERNATIONAL: "세계",
  CULTURE: "문화",
  SPORTS: "스포츠",
  IT_SCIENCE: "IT",
};

export default function EmotionToastSheet({ open, emotion, onClose }: Props) {
  const meta = emotion ? EMOTION_META[emotion] : null;

  const [news, setNews] = useState<SentimentNewsItem | null>(null);

  useEffect(() => {
    let canceled = false;

    async function run() {
      if (!open || !emotion) {
        setNews(null);
        return;
      }
      try {
        const sentiment = emotionToSentiment[emotion];
        const res = await getNewsBySentiment(sentiment, 0, 10);
        const first = res.content?.[0] ?? null;
        if (!canceled) setNews(first);
      } catch (e) {
        console.error(e);
        if (!canceled) setNews(null);
      }
    }

    run();
    return () => {
      canceled = true;
    };
  }, [open, emotion]);

  const cardTitle = news?.title ?? "관련 뉴스를 찾지 못했습니다";
  const cardDesc =
    news?.summary?.trim() ||
    news?.outlet ||
    (news ? "요약 정보가 없습니다." : "데이터 없음");

  const sentimentTag = useMemo(() => {
    if (!emotion || !meta) return null;
    return {
      text: meta.subs?.[0] || emotion,
      color: meta.color,
      bgColor: meta.bgColor ?? "#7BEAD742",
    };
  }, [emotion, meta]);

  const categoryTag = useMemo(() => {
    if (!news) return { text: "뉴스", color: "#8C8C8C", bgColor: "#ECECEC" };
    const text = news.category
      ? (categoryLabelMap[news.category] ?? news.category)
      : "뉴스";
    return {
      text,
      color: "#8C8C8C",
      bgColor: "#ECECEC",
    };
  }, [news]);
  const cardThumb = news?.thumbnail || hotNewsThumb;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#2A2A2A]/80 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed bottom-0 left-1/2 z-50 w-[393px] -translate-x-1/2 transform transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!open}
      >
        <div className="relative mx-auto flex max-h-[85vh] w-full flex-col overflow-y-auto rounded-t-[20px] bg-white pb-6 shadow-[0_0_20px_rgba(0,0,0,0.04)]">
          <div className="flex justify-center pt-6">
            <div className="h-[5px] w-[40px] flex-shrink-0 rounded-full bg-[#EAEAEA]" />
          </div>

          <h3 className="[font-family:'Pretendard Variable'] mt-4 w-full text-center text-[24px] font-bold leading-[160%] tracking-[-0.48px] text-black">
            {emotion ?? ""}
          </h3>

          <div className="mt-4 flex w-full flex-wrap justify-center gap-[5px] px-6">
            {meta?.subs.map((s) => (
              <Category
                key={s}
                text={s}
                textColor={meta.color}
                bgColor={meta.bgColor}
              />
            ))}
          </div>

          <div className="mx-7 mt-[25px] flex items-center gap-3 rounded-[14px] bg-[#F9F9F9] p-4">
            <HotNewsCard
              title={cardTitle}
              desc={cardDesc}
              thumbnail={cardThumb}
              category={categoryTag}
              sentiment={sentimentTag}
              className="w-full"
            />
          </div>

          <div className="mt-[65px] flex w-full justify-center">
            <button
              type="button"
              onClick={onClose}
              className="h-[52px] w-[332px] rounded-[10px] bg-[#EAEAEA] text-[16px] font-semibold text-[#2A2A2A]"
            >
              닫기
            </button>
          </div>

          {meta && (
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[140px] rounded-t-[20px]" />
          )}
        </div>
      </div>
    </>
  );
}
