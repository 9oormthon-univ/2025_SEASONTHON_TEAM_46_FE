/**
 * NewsTitle component
 * @param isImgVisible - Whether the thumbnail image is visible
 * @param categories - Array of category objects
 * @param title - Title of the news article
 * @param authorImg - Author's profile image
 * @param meta - Metadata information (e.g., date, time)
 * @param thumbnail - Thumbnail image for the news article
 * @return {JSX.Element}
 */

import { Category } from "../common/Category";
import type { NewsTitleProps } from "../../types/NewsTitleProps";
import { useNavigate } from "react-router-dom";
import DefaultImg from "../../assets/images/default_test_img.png";


export function NewsTitle({
  id,
  isImgVisible,
  categories,
  title,
  authorImg,
  meta,
  thumbnail,
}: NewsTitleProps) {
  const navigate = useNavigate();

  return (
    <article
      className="flex cursor-pointer flex-col gap-[16px]"
      onClick={() => navigate(`/news/detail/${id}`)}
    >
      <section className="flex flex-col gap-[20px]">
        {isImgVisible && thumbnail && (
          <img src={thumbnail} alt="뉴스 썸네일" height={156} />
        )}
        <div className="flex gap-[3px]">
          {categories.map((category) => (
            <Category
              key={category.text}
              text={category.text}
              textColor={category.color}
              bgColor={category.bgColor}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-[8px]">
        <p className="line-clamp-2 text-[20px] font-bold leading-[140%] text-[#2A2A2A]">
          {title}
        </p>
        <div className="flex gap-[4px]">
          <img
            src={`${import.meta.env.VITE_API_URL}${authorImg}` || DefaultImg}
            alt="작성자 프로필"
            height={20}
            width={20}
            className="rounded-[20px]"
          />
          <p className="text-[14px] font-[500] leading-[20px] text-[#979797]">
            {meta}
          </p>
        </div>
      </section>
    </article>
  );
}
