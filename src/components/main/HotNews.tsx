import { NewsCard } from "./NewsCard";
import { useNavigate } from "react-router-dom";
import type { DataProps } from "../../types/DataProps";

interface HotNewsProps {
  data: DataProps[];
}

export function HotNews({ data }: HotNewsProps) {
  const navigate = useNavigate();
  return (
    <section className="flex w-[350px] flex-col items-start gap-[16px]">
      <div className="flex items-center gap-[184px]">
        <p className="text-[18px] font-bold text-[#2A2A2A]">핫뉴스 TOP5</p>
        <p
          className="cursor-pointer text-[14px] font-[500] text-[#7F81FFE5]/90"
          onClick={() => {
            navigate("/hot");
          }}
        >
          바로가기
        </p>
      </div>

      <div className="flex w-full flex-nowrap items-center gap-[8px] overflow-x-auto">
        {data.slice(0, 5).map((data, index) => (
          <div key={index} className="flex-shrink-0 cursor-pointer">
            <NewsCard
              id={data.id}
              title={data.title}
              img={data.thumbnail}
              content={data.summary}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
