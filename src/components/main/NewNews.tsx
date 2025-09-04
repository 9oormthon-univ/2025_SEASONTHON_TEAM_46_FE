import { NewsTitle } from "./NewsTitle";
import { newsList } from "../../constant/newNewsData";

export function NewNews() {
  return (
    <article className="mt-[63px] flex w-[337px] flex-col gap-[16px] pb-[25px]">
      <section className="flex items-center gap-[4px]">
        <p className="text-[18px] font-bold text-[#2A2A2A]">새로운 뉴스</p>
        <p className="text-[16px] font-[500] leading-[140%] text-[#7F81FF]">
          4
        </p>
      </section>
      {newsList.map((news) => (
        <NewsTitle
          key={news.id}
          isImgVisible={true}
          categories={news.categories}
          title={news.title}
          authorImg={news.authorImg}
          meta={news.meta}
          thumbnail={news.thumbnail}
        />
      ))}
      <button
        className="mt-[22px] flex h-[52px] w-[337px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[#3D57FE]"
        onClick={() => {}}
      >
        <p className="text-[16px] font-[500] text-white">더 보기</p>
      </button>
    </article>
  );
}
