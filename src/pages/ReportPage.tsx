import NewsSentimentBar from "../components/report/NewsSentimentBar";
import SummaryBar from "../components/report/SummaryBar";

export default function ReportPage() {
  return (
    <div className="flex gap-8">
      <NewsSentimentBar />
      <SummaryBar
        lines={[
          "이번 주 경제 기사보다 정치 기사에 더 많은 시간 소비",
          "부정적 뉴스 비율이 전체의 50%로 높게 나타남",
        ]}
      />
    </div>
  );
}
