import HotNewsCard from "../components/hot/HotNewsCard";
import hotNews1 from "../assets/images/hot_news1.png";
import Header from "../components/common/Header";

export default function HotPage() {
  const base = {
    title: "오픈 ai, 해외 데이터 센터 구축속도.. 인도서 파트너 물색",
    desc: "(샌프란시스코=연합뉴스) 김태종...",
    categories: [
      { text: "성취", color: "#38D1B8", bgColor: "#7BEAD742" },
      { text: "IT", color: "#979797", bgColor: "#ECECEC" },
    ],
    thumbnail: hotNews1,
  };

  const items = Array.from({ length: 10 }, (_, i) => ({
    ...base,
    id: i + 1,
    rank: i + 1,
  }));

  return (
    <div className="bg-[#FAFAFA]">
      <Header title="이번주 핫뉴스 TOP 10" />
      <div className="relative flex w-full flex-col items-center pb-[90px] pt-9">
        <div className="flex w-[394px] flex-col items-center gap-[25px]">
          {items.map((it) => (
            <HotNewsCard
              key={it.id}
              rank={it.rank}
              title={it.title}
              desc={it.desc}
              categories={it.categories}
              thumbnail={it.thumbnail}
            />
          ))}
        </div>

        <div className="pointer-events-none fixed bottom-[90px] left-1/2 h-[72px] w-[394px] -translate-x-1/2 bg-gradient-to-b from-transparent to-[#FAFAFA]" />
      </div>
    </div>
  );
}
