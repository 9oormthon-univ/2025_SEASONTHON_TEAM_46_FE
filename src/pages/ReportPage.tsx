// src/pages/ReportPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/common/Header";
import CategoryCharts from "../components/report/CategoryCharts";
import EmotionChart, { type Segment } from "../components/report/EmotionChart";
import NewsSentimentBar from "../components/report/NewsSentimentBar";
import RecommendPage from "../components/report/Recommend";
import SummaryBar from "../components/report/SummaryBar";
import EmotionToastSheet from "../components/report/BottomSheet";
import EmotionHighlight from "../components/report/EmotionHighlight";
import type { EmotionKey } from "../constant/emotionData";

import mascot from "../assets/images/mascot.png";
import question from "../assets/icons/question.svg";

import { getSentiment } from "../api/report/getSentiment";
import { getEmotion } from "../api/report/getEmotionAnalysis";
import type { CategoryAnalysis } from "../types/CategoryAnalysis";
import { getCategoryAnalysis } from "../api/report/getCategoryAnalysis";
import { getSentimentPercentage } from "../api/report/getSentimentAnalysis";
import type { SentimentPercentageItem } from "../types/SentimentAnalysis";

type EmotionItem = {
  code: "POSITIVE" | "NEGATIVE" | "NEUTRAL" | string;
  count: number;
};

export default function ReportPage() {
  const [open, setOpen] = useState(false);
  const [activeEmotion, setActiveEmotion] = useState<EmotionKey | null>(null);

  const [lines, setLines] = useState<string[]>([]);

  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const total = positive + negative + neutral;

  const [categoryItems, setCategoryItems] = useState<
    { name: string; value: number }[]
  >([]);

  const [ringSegments, setRingSegments] = useState<Segment[]>([]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [summary, emotionList, categoryObj, sentimentPctList] =
          await Promise.all([
            getSentiment(),
            getEmotion(),
            getCategoryAnalysis(),
            getSentimentPercentage(),
          ]);

        // SummaryBar
        const nextLines = summary.includes("\n")
          ? summary.split("\n").filter(Boolean)
          : [summary];
        setLines(nextLines);

        // NewsSentimentBar
        const { pos, neg, neu } = countEmotion(emotionList);
        setPositive(pos);
        setNegative(neg);
        setNeutral(neu);

        // CategoryCharts
        setCategoryItems(toCategoryItems(categoryObj));

        setRingSegments(mapRingSegments(sentimentPctList));
      } catch (e: unknown) {
        let message = "데이터를 불러오지 못했습니다.";
        if (axios.isAxiosError(e)) {
          message = e.response?.data?.message ?? e.message ?? message;
        } else if (e instanceof Error) {
          message = e.message || message;
        }
        setErr(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#FAFAFA] pb-[91px]">
      <div className="relative flex h-[412px] w-[393px] flex-col items-center bg-[linear-gradient(179deg,#3D57FE_0.77%,#7F81FF_99.26%)]">
        <Header
          title="2025년 8월 3주차"
          showTitleArrows
          onTitleLeft={() => console.log("prev")}
          onTitleRight={() => console.log("next")}
        />

        <h2 className="mt-[33px] w-[196px] text-center text-[20px] font-extrabold leading-[28px] text-[#F2F2F2]">
          이번 주 나의 감정 소비,
          <br />
          <span className="inline-flex items-center justify-center gap-[6px]">
            확인해볼래?
            <img
              src={question}
              alt=""
              className="pointer-events-none h-[18px] w-[18px] translate-y-[1px] select-none"
            />
          </span>
        </h2>

        <div className="relative mt-[33px] w-[340px]">
          <EmotionChart
            segments={ringSegments.length ? ringSegments : getFallbackRing()}
            width={340}
            strokeWidth={18}
            gap={12}
            className="h-[160px] w-[340px]"
            onSegmentClick={(label) => {
              setActiveEmotion(label as EmotionKey);
              setOpen(true);
            }}
          />
          {open && activeEmotion && (
            <EmotionHighlight
              segments={ringSegments}
              label={activeEmotion}
              width={340}
              strokeWidth={18}
              gap={12}
              className="pointer-events-none absolute inset-0 z-[45] h-[160px] w-[340px]"
            />
          )}
        </div>

        <img
          src={mascot}
          alt="뉴스띵키 마스코트"
          draggable={false}
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[140px] w-[180px] -translate-x-1/2 select-none"
        />
      </div>

      <div className="flex w-[393px] flex-col gap-[33px] bg-white px-7 pt-[38px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[5px]">
            <p className="text-lg font-bold text-[#2A2A2A]">이번주 뉴스 소비</p>
            <span
              className="text-[16px] font-medium leading-[140%]"
              style={{
                color: "rgba(127, 129, 255, 0.90)",
              }}
              aria-label="이번주 총 뉴스 소비 건수"
            >
              {loading ? "-" : total.toLocaleString()}
            </span>
          </div>

          <NewsSentimentBar
            positive={positive}
            negative={negative}
            neutral={neutral}
          />
        </div>

        <div className="mb-[25px]">
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold text-[#2A2A2A]">
              카테고리 별 뉴스 소비
            </p>
            <CategoryCharts items={categoryItems} />
          </div>

          {loading ? (
            <SummaryBar lines={["요약을 불러오는 중…"]} />
          ) : err ? (
            <SummaryBar lines={[err]} />
          ) : (
            <SummaryBar lines={lines} />
          )}
        </div>
      </div>

      <div className="h-3 w-[393px] flex-shrink-0 bg-[#FAFAFA]" />
      <RecommendPage />

      <EmotionToastSheet
        open={open}
        emotion={activeEmotion}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

function countEmotion(list: EmotionItem[]) {
  let pos = 0,
    neg = 0,
    neu = 0;
  for (const item of list ?? []) {
    switch ((item.code || "").toUpperCase()) {
      case "POSITIVE":
        pos += item.count || 0;
        break;
      case "NEGATIVE":
        neg += item.count || 0;
        break;
      case "NEUTRAL":
        neu += item.count || 0;
        break;
      default:
        break;
    }
  }
  return { pos, neg, neu };
}
function toCategoryItems(
  obj: CategoryAnalysis,
): { name: string; value: number }[] {
  if (!obj || typeof obj !== "object") return [];
  const entries = Object.entries(obj) as [string, number][];
  const total = entries.reduce(
    (acc, [, v]) => acc + (Number.isFinite(v) ? v : 0),
    0,
  );

  if (total <= 0) {
    return entries.map(([k]) => ({ name: mapCategoryName(k), value: 0 }));
  }
  return entries.map(([k, v]) => ({
    name: mapCategoryName(k),
    value: Math.round(((Number(v) || 0) / total) * 100),
  }));
}
function mapCategoryName(key: string): string {
  const k = (key || "").toLowerCase();
  const map: Record<string, string> = {
    politics: "정치",
    sports: "운동",
    it_science: "IT",
    culture: "문화",
    international: "세계",
    economy: "경제",
    society: "사회",
  };

  const isKorean = /[가-힣]/.test(key);
  return isKorean ? key : (map[k] ?? key);
}

function mapRingSegments(list: SentimentPercentageItem[]): Segment[] {
  const palette: Record<
    "HOPE" | "FUN" | "ANGER" | "ANXIETY" | "SADNESS" | "NEUTRAL",
    { label: string; color: string }
  > = {
    HOPE: { label: "희망", color: "#7BEAD7" },
    FUN: { label: "재미", color: "#B5F6EB" },
    ANGER: { label: "분노", color: "#FF7676" },
    ANXIETY: { label: "불안", color: "#FFB3B3" },
    SADNESS: { label: "슬픔", color: "#9FA0A3" },
    NEUTRAL: { label: "중립", color: "#D9D9D9" },
  };

  const buckets: Record<string, number> = {
    HOPE: 0,
    FUN: 0,
    ANGER: 0,
    ANXIETY: 0,
    SADNESS: 0,
    NEUTRAL: 0,
  };

  for (const item of list ?? []) {
    const raw = String(item.code || "");
    const prefix = raw.split("_")[0]?.toUpperCase();

    if (prefix in buckets) {
      const pct = Number.isFinite(item.percentage) ? item.percentage : 0;
      buckets[prefix] += pct;
    }
  }

  const segments: Segment[] = (
    ["HOPE", "FUN", "ANGER", "ANXIETY", "SADNESS", "NEUTRAL"] as const
  )
    .map((k) => {
      const meta = palette[k];
      const val = Math.max(0, Math.min(100, Math.round(buckets[k])));
      return { label: meta.label, color: meta.color, value: val };
    })
    .filter((s) => s.value > 0);

  if (!segments.length) {
    return [{ label: "중립", color: "#D9D9D9", value: 100 }];
  }

  return segments;
}

function getFallbackRing(): Segment[] {
  return [{ label: "중립", color: "#D9D9D9", value: 100 }];
}
