// src/pages/ReportPage.tsx
import { useState } from "react";
import Header from "../components/common/Header";
import CategoryCharts from "../components/report/CategoryCharts";
import EmotionChart, { type Segment } from "../components/report/EmotionChart";
import NewsSentimentBar from "../components/report/NewsSentimentBar";
import RecommendPage from "../components/report/Recommend";
import SummaryBar from "../components/report/SummaryBar";
import EmotionToastSheet from "../components/report/BottomSheet";
import type { EmotionKey } from "../constant/emotionData";
import mascot from "../assets/images/mascot.png";
import EmotionHighlight from "../components/report/EmotionHighlight";
import question from "../assets/icons/question.svg";
const segments: Segment[] = [
  { label: "희망", color: "#7BEAD7", value: 25 },
  { label: "재미", color: "#B5F6EB", value: 15 },
  { label: "분노", color: "#FF7676", value: 20 },
  { label: "불안", color: "#FFB3B3", value: 15 },
  { label: "슬픔", color: "#9FA0A3", value: 10 },
  { label: "중립", color: "#D9D9D9", value: 15 },
];

export default function ReportPage() {
  const [open, setOpen] = useState(false);
  const [activeEmotion, setActiveEmotion] = useState<EmotionKey | null>(null);

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#FAFAFA] pb-[91px]">
      <div className="relative flex h-[412px] w-[393px] flex-col items-center bg-[linear-gradient(179deg,#3D57FE_0.77%,#7F81FF_99.26%)]">
        <Header
          title="2025년 8월 3주차"
          showTitleArrows
          onTitleLeft={() => console.log("prev")}
          onTitleRight={() => console.log("next")}
        />

        <h2 className="mt-[33px] w-[196px] text-center text-[20px] font-extrabold leading-[28px] text-[#F2F2F2] [font-feature-settings:'liga'_off,'clig'_off]">
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

        {/* 차트 래퍼 안에서는 마스코트 제거 */}
        <div className="relative mt-[33px] w-[340px]">
          <EmotionChart
            segments={segments}
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
              segments={segments}
              label={activeEmotion}
              width={340}
              strokeWidth={18}
              gap={12}
              className="pointer-events-none absolute inset-0 z-[45] h-[160px] w-[340px]"
            />
          )}
        </div>

        {/* ✅ 마스코트: 헤더 컨테이너 기준으로 맨 아래에 붙임 */}
        <img
          src={mascot}
          alt="뉴스띵키 마스코트"
          draggable={false}
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[140px] w-[180px] -translate-x-1/2 select-none"
        />
      </div>
      <div className="flex w-[393px] flex-col gap-[33px] bg-white px-7 pt-[38px]">
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold text-[#2A2A2A]">이번주 뉴스 소비</p>
          <NewsSentimentBar />
        </div>
        <div className="mb-[25px]">
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold text-[#2A2A2A]">
              카테고리 별 뉴스 소비
            </p>
            <CategoryCharts />
          </div>
          <SummaryBar
            lines={[
              "이번 주 경제 기사보다 정치 기사에 더 많은 시간 소비",
              "부정적 뉴스 비율이 전체의 50%로 높게 나타남",
            ]}
          />
        </div>
      </div>

      <div className="h-3 w-[393px] flex-shrink-0 bg-[#FAFAFA]" />
      <RecommendPage />

      {/* 바텀시트 */}
      <EmotionToastSheet
        open={open}
        emotion={activeEmotion}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
