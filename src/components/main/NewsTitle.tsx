import { Category } from "../common/Category";
import TestSvg from "../../assets/images/test_news.png";

export function NewsTitle({ isImgVisible }: { isImgVisible?: boolean }) {
  return (
    <article className="flex flex-col gap-[16px]">
      <section className="flex flex-col gap-[20px]">
        {isImgVisible && <img src={TestSvg} alt="New News" height={156} />}
        <div className="flex gap-[3px]">
          <Category text="논란" color="#FF6556" />
          <Category text="세계" color="#79E2D0" />
        </div>
      </section>
      <section className="flex flex-col gap-[8px]">
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
    </article>
  );
}
