import { NewsCard } from "./NewsCard";

export function HotNews() {
  return (
    <section className="flex w-[350px] flex-col items-start gap-[16px]">
      <div className="flex items-center gap-[184px]">
        <p className="text-[18px] font-bold text-[#2A2A2A]">핫뉴스 TOP5</p>
        <p
          className="cursor-pointer text-[14px] font-[500] text-[#7F81FFE5]/90"
          onClick={() => {}}
        >
          바로가기
        </p>
      </div>

      <div className="flex w-full flex-nowrap items-center gap-[8px] overflow-x-auto">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex-shrink-0">
            <NewsCard />
          </div>
        ))}
      </div>
    </section>
  );
}
