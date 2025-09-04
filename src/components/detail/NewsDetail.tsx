import TestPng from "../../assets/images/test_news.png";
import HeartSvg from "../../assets/icons/heart.svg";
import HeartBlueSvg from "../../assets/icons/heart_blue.svg";
import ChatSvg from "../../assets/icons/chat.svg";
import { Category } from "../common/Category";
import { useState } from "react";

export function NewsDetail() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <main className="mt-[14px] flex w-full flex-col items-center bg-white pt-[33px]">
      <article className="flex w-[365px] flex-col items-center gap-[20px]">
        <div className="flex w-[336px] flex-col items-end gap-[20px]">
          {/* 위에 */}
          <section className="flex flex-col items-start gap-[16px]">
            <div className="flex gap-[3px]">
              <Category text="논란" color="#FF6556" />
              <Category text="세계" color="#79E2D0" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="line-clamp-2 text-[20px] font-bold leading-[140%] text-[#2A2A2A]">
                SK 울산 AI데이터센터 건립…'챗GPT 정신병' 경고등[뉴스잇(IT)쥬]
              </p>
              <div className="flex gap-[4px]">
                <img
                  src={TestPng}
                  alt="New News"
                  height={20}
                  width={20}
                  className="rounded-[20px]"
                />
                <p className="text-[14px] font-[500] leading-[20px] text-[#979797]">
                  뉴스1 | 김민석 기자 | 2025.08.31
                </p>
              </div>
            </div>
          </section>
          {/* 요약 */}
          <section>
            <article className="h-auto w-[337px] flex-shrink-0 rounded-[10px] bg-[#FAFAFA] px-[19.5px] pb-[13px] pt-[20px]">
              <div className="flex flex-col gap-[8px]">
                <p className="text-[13px] font-bold leading-[140%] text-[#7F81FF] text-opacity-90">
                  띵키가 요약해줄게 !
                </p>
                <p className="w-[298px] text-[14px] leading-[150%] tracking-[-0.28px] text-[#B3B3B3]">
                  SK가 울산에 대규모 AI 데이터센터를 착공했지만, 챗GPT 논란과
                  SKT 해킹 과징금으로 우려가 커지고 있음 AI 산업 성장과 함께
                  사회적·법적 논쟁도 불거지는 상황
                </p>
              </div>
            </article>
          </section>
          {/* 본문 */}
          <section className="flex flex-col gap-[15px]">
            <img src={TestPng} alt="이미지" />
            <p className="w-[335px] text-[14px] font-[500] leading-[160%] tracking-[-0.28px] text-[#B3B3B3]">
              (서울=뉴스1) 김민석 기자 = SK그룹이 울산에 비수도권 최대 규모의
              인공지능(AI) 데이터센터 건립에 착수했다. 전 세계에선 AI 챗봇 또는
              AI 컴패니언(동반자)과 대화를 하다 현실감각을 잃는 'AI 정신병'
              현상이 속출하고 있다. 최근 미국에선 아들을 잃은 부모가 샘 올트먼
              오픈AI CEO를 상대로 소송을 제기했다. (서울=뉴스1) 김민석 기자 =
              SK그룹이 울산에 비수도권 최대 규모의 인공지능(AI) 데이터센터
              건립에 착수했다. 전 세계에선 AI 챗봇 또는 AI 컴패니언(동반자)과
              대화를 하다 현실감각을 잃는 'AI 정신병' 현상이 속출하고 있다. 최근
              미국에선 아들을 잃은 부모가 샘 올트먼 오픈AI CEO를 상대로 소송을
              제기했다.
            </p>
            <div className="flex items-center gap-[15px]">
              <div className="flex items-center gap-[4px]">
                <img
                  src={isLiked ? HeartBlueSvg : HeartSvg}
                  alt="Heart Icon"
                  className="cursor-pointer"
                  onClick={() => setIsLiked(!isLiked)}
                  width={16}
                  height={14}
                />
                <p>172</p>
              </div>
              <div className="flex items-center gap-[4px]">
                <img src={ChatSvg} alt="Chat Icon" className="cursor-pointer" />
                <p>45</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
