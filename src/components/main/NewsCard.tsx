import { Category } from "../common/Category";
import { useNavigate } from "react-router-dom";
import DefaultImage from "../../assets/images/default_test_img.png";

export function NewsCard({
  id,
  title,
  img,
  content,
}: {
  id: number;
  title: string;
  img: string;
  content: string;
}) {
  const navigate = useNavigate();
  return (
    <article
      className="relative h-[124px] w-[240px] rounded-[10px]"
      onClick={() => {
        navigate(`/news/detail/${id}`);
      }}
    >
      <img
        src={img || DefaultImage}
        alt="News"
        className="h-full w-full rounded-[10px] object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 rounded-[10px] bg-black/60 pl-[15px] pt-[13px]">
        <section className="flex gap-[3px]">
          <Category text="논란" textColor="#FF7676" bgColor="#FF767642" />
          <Category text="세계" textColor="#EAEAEA" bgColor="#2A2A2ACC" />
        </section>
        <section>
          <div className="mt-[15px] w-[195px]">
            <p className="line-clamp-2 text-[16px] font-bold leading-[130%] tracking-[-0.32px] text-[#EDEDED]">
              {title}
            </p>
          </div>
          <p className="mt-[3px] w-[208px] truncate text-[12px] font-[500] leading-[140%] tracking-[-0.24px] text-[#B3B3B3]">
            {content}
          </p>
        </section>
      </div>
    </article>
  );
}
