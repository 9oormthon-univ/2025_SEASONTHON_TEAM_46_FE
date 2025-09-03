import TestSvg from "../../assets/images/test_news.png";
import { Category } from "../common/Category";

export function NewNews() {
  return (
    <article className="mt-[63px] flex w-[337px] flex-col gap-[16px] pb-[25px]">
      <section className="flex items-center gap-[4px]">
        <p className="text-[18px] font-bold text-[#2A2A2A]">새로운 뉴스</p>
        <p className="text-[16px] font-[500] leading-[140%] text-[#7F81FF]">
          4
        </p>
      </section>
      <section className="flex flex-col gap-[20px]">
        <img src={TestSvg} alt="New News" height={156} />
        <div className="flex gap-[3px]">
          <Category text="논란" color="#FF6556" />
          <Category text="세계" color="#79E2D0" />
        </div>
      </section>
      <section>
        <p className="line-clamp-2 text-[20px] font-bold leading-[140%] text-[#2A2A2A]">
          SK 울산 AI데이터센터 건립…'챗GPT 정신병' 경고등[뉴스잇(IT)쥬]
        </p>
        <div className="flex gap-[4px]">
          <img
            src={TestSvg}
            alt="New News"
            height={20}
            width={20}
            className="rounded-[20px]"
          />
          <p className="text-[14px] font-[500] leading-[20px] text-[#979797]">
            뉴스1 | 김민석 기자 | 2025.08.31
          </p>
        </div>
      </section>
      <button
        className="mt-[22px] flex h-[52px] w-[337px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[#3D57FE]"
        onClick={() => {}}
      >
        <p className="text-[16px] font-[500] text-white">더 보기</p>
      </button>
    </article>
  );
}
