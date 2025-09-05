import Header from "../components/common/Header";
import CategoryCharts from "../components/report/CategoryCharts";
import EmotionChart from "../components/report/EmotionChart";
import NewsSentimentBar from "../components/report/NewsSentimentBar";
import RecommendPage from "../components/report/Recommend";
import SummaryBar from "../components/report/SummaryBar";
const segments = [
  { label: "희망", color: "#7BEAD7", value: 25 },
  { label: "재미", color: "#B5F6EB", value: 15 },
  { label: "분노", color: "#D9D9D9", value: 20 },
  { label: "불안", color: "#F2F2F2", value: 15 },
  { label: "슬픔", color: "#FF9B9B", value: 10 },
  { label: "중립", color: "#FF6565", value: 15 },
];

export default function ReportPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#FAFAFA] pb-[91px]">
      <div className="relative flex h-[412px] w-[393px] flex-col items-center bg-[linear-gradient(179deg,#3D57FE_0.77%,#7F81FF_99.26%)]">
        <Header title="2025년 8월 3주차" />

        <h2 className="mt-[33px] w-[196px] text-center text-[20px] font-extrabold leading-[28px] text-[#F2F2F2] [font-feature-settings:'liga'_off,'clig'_off]">
          이번 주 나의 감정 소비,
          <br />
          확인해볼래?
        </h2>

        <EmotionChart
          segments={segments}
          width={340}
          strokeWidth={18}
          gap={12}
          className="mt-[33px] h-[120px]"
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
      <div className="h-3 w-[393px] flex-shrink-0 bg-[#FAFAFA]"></div>
      <RecommendPage />
    </div>
  );
}
