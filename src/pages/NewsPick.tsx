import HotNewsCard from "../components/hot/HotNewsCard";
import { FilterHeader } from "../components/my/FilterHeader";
import hotNews1 from "../assets/images/hot_news1.png";
import { useStore } from "../stores/useStore";
import { useEffect } from "react";

type Item = {
  id: number;
  title: string;
  desc: string;
  categories: { text: string; color: string }[];
  thumbnail: string;
};

const baseItem: Omit<Item, "id"> = {
  title: "오픈 ai, 해외 데이터 센터 구축속도.. 인도서 파트너 물색",
  desc: "(샌프란시스코=연합뉴스) 김태종...",
  categories: [
    { text: "성취", color: "#79E2D0" },
    { text: "IT", color: "#EAEAEA" },
  ],
  thumbnail: hotNews1,
};

export default function NewsPick() {
  const setBottomNav = useStore((state) => state.setBottomNav);
  const listToRender: Item[] = Array.from({ length: 10 }, (_, idx) => ({
    ...baseItem,
    id: idx + 1,
  }));

  useEffect(() => {
    setBottomNav(false);
    return () => setBottomNav(true);
  }, [setBottomNav]);

  return (
    <article className="flex h-screen w-full flex-col items-center bg-[#FAFAFA]">
      <FilterHeader />
      <div className="mt-[29px] flex w-full flex-col items-center gap-[25px] pb-[20px]">
        {listToRender.map((it: Item) => (
          <HotNewsCard
            key={it.id}
            title={it.title}
            desc={it.desc}
            categories={it.categories}
            thumbnail={it.thumbnail}
          />
        ))}
      </div>
    </article>
  );
}
