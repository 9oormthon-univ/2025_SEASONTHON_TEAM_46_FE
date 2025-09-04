import { Category } from "../common/Category";
import TestNews from "../../assets/images/test_news2.png";

/**
 * NewsImgCard component
 * @param title - The title to display above the news image cards
 * @returns {JSX.Element}
 */

export function NewsImgCard({ title }: { title: string }) {
  return (
    <section className="mt-[18px] flex flex-col items-start gap-[15px]">
      <p className="text-[14px] font-[500] leading-[140%] text-[#7F81FF]/90">
        {title}
      </p>
      <div className="flex flex-col items-start gap-[13px]">
        {Array.from({ length: 2 }, (_, index) => (
          <article
            key={index}
            className="h-[129px] w-[337px] rounded-[10px] bg-[#FAFAFA] px-[18px] py-[14px]"
          >
            <div className="flex gap-[21px]">
              <div className="flex flex-col gap-[4px]">
                <div className="flex gap-[3px]">
                  <Category text="성취" color="#79E2D0" />
                  <Category text="사회" color="#FF6556" />
                </div>
                <p className="line-clamp-2 w-[189px] text-[16px] font-bold leading-[140%] tracking-[-0.48px] text-[#2A2A2A]">
                  ‘케데헌’ 열풍 이정도야?… 외국인 136만명 서울 몰려왔다
                </p>
                <p className="line-clamp-1 w-[185px] text-[12px] font-[500] leading-[140%] tracking-[-0.24px] text-[#B3B3B3]">
                  [이데일리 함지현 기자] 서울시는 7월 어쩌구저쩌구
                </p>
              </div>
              <img src={TestNews} alt="이미지" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
