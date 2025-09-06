/**
 * NewsImgCard component
 * @param topic - The topic to display above the news image cards
 * @param title - The title to display above the news image cards
 * @param content - The content to display below the news image cards
 * @param imgSrc - The source of the image to display in the news image cards
 * @returns {JSX.Element}
 */

import { Category } from "../common/Category";
import type { NewsItem } from "../../types/NewsItem";

export function NewsImgCard({
  topic,
  newsList,
}: {
  topic?: string;
  newsList: NewsItem[];
}) {
  return (
    <section className="mt-[18px] flex flex-col items-start gap-[15px]">
      <p className="text-[14px] font-[500] leading-[140%] text-[#7F81FF]/90">
        {topic}
      </p>
      <div className="flex flex-col items-start gap-[13px]">
        {newsList.map((news) => (
          <article
            key={news.id}
            className="h-[129px] w-[337px] rounded-[10px] bg-[#FAFAFA] px-[18px] py-[14px]"
          >
            <div className="flex gap-[21px]">
              <div className="flex flex-col gap-[4px]">
                <div className="flex gap-[3px]">
                  <Category
                    text="성취"
                    textColor="#38D1B8"
                    bgColor="#7BEAD742"
                  />
                  <Category text="사회" textColor="#979797" bgColor="#ECECEC" />
                </div>
                <p className="line-clamp-2 w-[189px] text-[16px] font-bold leading-[140%] tracking-[-0.48px] text-[#2A2A2A]">
                  {news.title}
                </p>
                <p className="line-clamp-1 w-[185px] text-[12px] font-[500] leading-[140%] tracking-[-0.24px] text-[#B3B3B3]">
                  {news.content}
                </p>
              </div>
              <img
                src={news.imgSrc}
                alt="이미지"
                width={88}
                height={88}
                className="rounded-lg"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
