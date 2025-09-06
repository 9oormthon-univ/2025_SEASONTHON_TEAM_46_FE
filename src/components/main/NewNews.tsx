import { useEffect } from "react";
import type { DataProps } from "../../types/DataProps";
import { NewsTitle } from "./NewsTitle";
import { useNavigate } from "react-router-dom";

interface NewNewsProps {
  data: DataProps[];
}

export function NewNews({ data }: NewNewsProps) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <article className="mt-[63px] flex w-[337px] flex-col gap-[16px] pb-[25px]">
      <section className="flex items-center gap-[4px]">
        <p className="text-[18px] font-bold text-[#2A2A2A]">새로운 뉴스</p>
        <p className="text-[16px] font-[500] leading-[140%] text-[#7F81FF]">
          {data.length}
        </p>
      </section>
      {data.slice(1, 2).map((news) => (
        <NewsTitle
          key={news.id}
          id={news.id}
          isImgVisible={true}
          categories={[
            {
              text: "논란",
              color: "#FF0000",
              bgColor: "rgba(255, 118, 118, 0.26)",
            },
            {
              text: "IT",
              color: "#797979",
              bgColor: "#F2F2F2",
            },
          ]}
          title={news.title}
          authorImg={news.thumbnail}
          meta={`${news.outlet} | ${news.taggedAt.slice(0, 10)}`}
          thumbnail={news.thumbnail}
        />
      ))}
      <button
        className="mt-[22px] flex h-[52px] w-[337px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[#3D57FE]"
        onClick={() => {
          navigate("/search");
        }}
      >
        <p className="text-[16px] font-[500] text-white">더 보기</p>
      </button>
    </article>
  );
}
