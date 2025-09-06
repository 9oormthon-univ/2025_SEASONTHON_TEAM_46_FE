import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import SearchPageHeader from "../components/search/SearchPageHeader";
import HotNewsCard from "../components/hot/HotNewsCard";
import hotNews1 from "../assets/images/hot_news1.png";

type Item = {
  id: number;
  title: string;
  desc: string;
  categories: { text: string; color: string; bgColor: string }[];
  thumbnail: string;
};

const BATCH_SIZE = 10;

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [editing, setEditing] = useState(false);

  const baseItem: Omit<Item, "id"> = {
    title: "오픈 ai, 해외 데이터 센터 구축속도.. 인도서 파트너 물색",
    desc: "(샌프란시스코=연합뉴스) 김태종...",
    categories: [
      { text: "성취", color: "#38D1B8", bgColor: "#7BEAD742" },
      { text: "IT", color: "#979797", bgColor: "#ECECEC" },
    ],
    thumbnail: hotNews1,
  };

  const [items, setItems] = useState<Item[]>(() =>
    Array.from({ length: BATCH_SIZE }, (_, i) => ({ id: i + 1, ...baseItem })),
  );

  const nextIdRef = useRef(items.length + 1);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    setItems((prev) => {
      const next = Array.from({ length: BATCH_SIZE }, () => ({
        id: nextIdRef.current++,
        ...baseItem,
      }));
      return prev.concat(next);
    });

    setTimeout(() => {
      loadingRef.current = false;
    }, 0);
  }, [baseItem]);

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

  const norm = (s: string) => s.toLowerCase().trim();
  const results = useMemo(() => {
    const q = norm(submitted);
    if (!q) return items;
    return items.filter(
      (it) => norm(it.title).includes(q) || norm(it.desc).includes(q),
    );
  }, [submitted, items]);

  const showTabs = !editing;
  const showCards = !editing;
  const listToRender = results;

  return (
    <div className="h-screen bg-[#FAFAFA]">
      <SearchPageHeader
        query={query}
        onQueryChange={setQuery}
        onSubmit={(q) => {
          setSubmitted(q);
          setEditing(false);
        }}
        showTabs={showTabs}
        onInputFocus={() => setEditing(true)}
        onInputBlur={() => setEditing(false)}
      />

      {showCards && (
        <div className="mx-auto w-[393px] space-y-[25px] px-7 py-4">
          {listToRender.map((it) => (
            <HotNewsCard
              key={it.id}
              title={it.title}
              desc={it.desc}
              categories={it.categories}
              thumbnail={it.thumbnail}
            />
          ))}

          <div ref={sentinelRef} className="h-1 w-full" />

          {submitted.trim() && listToRender.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-400">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-[90px] h-[72px] bg-gradient-to-b from-transparent to-[#FAFAFA]" />
    </div>
  );
}
