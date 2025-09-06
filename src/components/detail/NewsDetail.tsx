/**
 * NewsDetail Component
 * @param titleData - Data for the news title section
 * @param summary - Summary of the news article
 * @param content - Content of the news article
 * @param imgSrc - Source URL for the news article image
 * @param likes - Number of likes for the news article
 * @param comments - Number of comments for the news article
 * @return {JSX.Element}
 */

import HeartSvg from "../../assets/icons/heart.svg";
import HeartBlueSvg from "../../assets/icons/heart_blue.svg";
import ChatSvg from "../../assets/icons/chat.svg";
import { useState } from "react";
import { NewsTitle } from "../main/NewsTitle";
import type { NewsDetailProps } from "../../types/NewsDetailProps";
import api from "../../hooks/api";

export function NewsDetail({
  titleData,
  summary,
  content,
  imgSrc,
  likes,
  comments,
}: NewsDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(likes || 0);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    const res = await api.post(`/likes?newsId=${titleData.id}`);
    if (res.data) {
      setIsLiked(true);
      if (typeof likedCount === "number") {
        setLikedCount(likedCount + 1);
      } else {
        setLikedCount(1);
      }
    }
  };
  return (
    <main className="mt-[14px] flex w-full flex-col items-center bg-white pb-[30px] pt-[27px]">
      <article className="flex w-[365px] flex-col items-center gap-[20px]">
        <div className="flex w-[336px] flex-col items-end gap-[20px]">
          <NewsTitle {...titleData} />
          <section>
            <article className="h-auto w-[337px] flex-shrink-0 rounded-[10px] bg-[#FAFAFA] px-[19.5px] pb-[13px] pt-[20px]">
              <div className="flex flex-col gap-[8px]">
                <p className="text-[13px] font-bold leading-[140%] text-[#7F81FF] text-opacity-90">
                  띵키가 요약해줄게 !
                </p>
                <p className="w-[298px] text-[14px] leading-[150%] tracking-[-0.28px] text-[#B3B3B3]">
                  {summary}
                </p>
              </div>
            </article>
          </section>
          <section className="flex flex-col gap-[15px]">
            <img src={imgSrc} alt="이미지" />
            <p className="w-[335px] text-[14px] font-[500] leading-[160%] tracking-[-0.28px] text-[#B3B3B3]">
              {content}
            </p>
            <div className="flex items-center gap-[15px]">
              <div className="flex items-center gap-[4px]">
                <img
                  src={isLiked ? HeartBlueSvg : HeartSvg}
                  alt="Heart Icon"
                  className="cursor-pointer"
                  onClick={() => {
                    handleLike();
                  }}
                  width={16}
                  height={14}
                />
                <p>{likedCount || 0}</p>
              </div>
              <div className="flex items-center gap-[4px]">
                <img src={ChatSvg} alt="Chat Icon" className="cursor-pointer" />
                <p>{comments || 0}</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
