import { Category } from "../common/Category";

interface NewsTitleProps {
  isImgVisible?: boolean;
  categories: { text: string; color: string }[];
  title: string;
  authorImg: string;
  meta: string;
  thumbnail?: string;
}

export function NewsTitle({
  isImgVisible,
  categories,
  title,
  authorImg,
  meta,
  thumbnail,
}: NewsTitleProps) {
  return (
    <article className="flex flex-col gap-[16px]">
      <section className="flex flex-col gap-[20px]">
        {isImgVisible && thumbnail && (
          <img src={thumbnail} alt="뉴스 썸네일" height={156} />
        )}
        <div className="flex gap-[3px]">
          {categories.map((category) => (
            <Category
              key={category.text}
              text={category.text}
              color={category.color}
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
            src={authorImg}
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
