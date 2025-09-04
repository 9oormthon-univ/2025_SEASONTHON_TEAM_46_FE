// pages/SearchPage.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import SearchPageHeader from "../components/search/SearchPageHeader";
import HotNewsCard from "../components/hot/HotNewsCard";
import hotNews1 from "../assets/images/hot_news1.png";

type Item = {
  id: number;
  title: string;
  desc: string;
  categories: { text: string; color: string }[];
  thumbnail: string;
};

const BATCH_SIZE = 10;

export default function SearchPage() {
  const base: Omit<Item, "id"> = {
    title: "오픈 ai, 해외 데이터 센터 구축속도.. 인도서 파트너 물색",
    desc: "(샌프란시스코=연합뉴스) 김태종...",
    categories: [
      { text: "성취", color: "#79E2D0" },
      { text: "IT", color: "#EAEAEA" },
    ],
    thumbnail: hotNews1,
  };

  const [items, setItems] = useState<Item[]>(() =>
    Array.from({ length: BATCH_SIZE }, (_, i) => ({ id: i + 1, ...base })),
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    setItems((prev) => {
      const start = prev.length + 1;
      const next = Array.from({ length: BATCH_SIZE }, (_, i) => ({
        id: start + i,
        ...base,
      }));
      return prev.concat(next);
    });

    setTimeout(() => {
      loadingRef.current = false;
    }, 0);
  }, [base]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [loadMore]);

  return (
    <div className="bg-[#FAFAFA]">
      <SearchPageHeader />

      <div className="mx-auto w-[393px] space-y-[25px] px-7 py-4">
        {items.map((it) => (
          <HotNewsCard
            key={it.id}
            title={it.title}
            desc={it.desc}
            categories={it.categories}
            thumbnail={it.thumbnail}
          />
        ))}

        <div ref={sentinelRef} className="h-1 w-full" />
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[90px] h-[72px] bg-gradient-to-b from-transparent to-[#FAFAFA]" />
    </div>
  );
}
