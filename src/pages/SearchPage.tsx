// src/pages/SearchPage.tsx
import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchPageHeader from "../components/search/SearchPageHeader";
import HotNewsCard from "../components/hot/HotNewsCard";
import hotNews1 from "../assets/images/hot_news1.png";

import type { CategoryKey } from "../components/search/CategoryTabs";
import { searchNews } from "../api/search/searchNews";
import { getNewsByCategory } from "../api/search/getCategoryNews";
import api from "../hooks/api";
import type { SearchNewsItem } from "../types/search";

type Item = {
  id: number;
  title: string;
  desc: string;
  categories: { text: string; color: string; bgColor: string }[];
  thumbnail: string;
};

const PAGE_SIZE = 10;

function mapCategoryKeyToServer(cat: CategoryKey): string | null {
  switch (cat) {
    case "정치":
      return "POLITICS";
    case "세계":
      return "INTERNATIONAL";
    case "IT":
      return "IT_SCIENCE";
    case "생활":
      return "CULTURE";
    case "사회":
      return "SOCIETY";
    default:
      return null;
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [editing, setEditing] = useState(false);

  const [category, setCategory] = useState<CategoryKey>("전체");
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const fetchingRef = useRef(false);

  const toCardItemsFromSearch = (arr: SearchNewsItem[]): Item[] =>
    arr.map((d) => ({
      id: d.id,
      title: d.title,
      desc: d.outlet,
      categories: [
        { text: d.orientation || "NEWS", color: "#979797", bgColor: "#ECECEC" },
      ],
      thumbnail: hotNews1,
    }));

  const toCardItemsFromAll = (arr: SearchNewsItem[]): Item[] =>
    arr.map((d) => ({
      id: d.id,
      title: d.title,
      desc: d.outlet,
      categories: [
        { text: d.orientation ?? "뉴스", color: "#979797", bgColor: "#ECECEC" },
      ],
      thumbnail: hotNews1,
    }));

  useEffect(() => {
    if (category !== "전체") return;
    (async () => {
      try {
        const res = await api.get("/api/news/all");
        setItems(toCardItemsFromAll(res.data ?? []));
        setHasMore(false);
        setPage(0);
      } catch (e) {
        console.error(e);
        setItems([]);
        setHasMore(false);
        setPage(0);
      }
    })();
  }, [category]);

  const fetchSearchPage = useCallback(async (kw: string, p: number) => {
    if (!kw || fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const res = await searchNews(kw, p, PAGE_SIZE);
      const next = toCardItemsFromSearch(res.content || []);
      setItems((prev) => (p === 0 ? next : prev.concat(next)));
      setHasMore(!res.last);
      setPage(res.page);
    } catch (e) {
      console.error(e);
      if (p === 0) setItems([]);
      setHasMore(false);
    } finally {
      fetchingRef.current = false;
    }
  }, []);

  const fetchCategoryPage = useCallback(async (cat: CategoryKey, p: number) => {
    const code = mapCategoryKeyToServer(cat);
    if (!code || fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const res = await getNewsByCategory(code, p, PAGE_SIZE);
      const next = toCardItemsFromSearch(res.content || []);
      setItems((prev) => (p === 0 ? next : prev.concat(next)));
      setHasMore(!res.last);
      setPage(res.page);
    } catch (e) {
      console.error(e);
      if (p === 0) setItems([]);
      setHasMore(false);
    } finally {
      fetchingRef.current = false;
    }
  }, []);

  const handleSubmit = useCallback(
    (q: string) => {
      const kw = q.trim();
      setSubmitted(kw);
      setEditing(false);
      setItems([]);
      setPage(0);
      setHasMore(false);
      if (kw) fetchSearchPage(kw, 0);
    },
    [fetchSearchPage],
  );

  const handleCategoryChange = useCallback(
    (next: CategoryKey) => {
      setCategory(next);
      setSubmitted("");
      setQuery("");
      setItems([]);
      setPage(0);
      setHasMore(false);

      const code = mapCategoryKeyToServer(next);
      if (code) {
        fetchCategoryPage(next, 0);
      }
    },
    [fetchCategoryPage],
  );

  const loadMore = useCallback(() => {
    const code = mapCategoryKeyToServer(category);
    if (code) {
      if (!hasMore) return;
      fetchCategoryPage(category, page + 1);
      return;
    }
    if (!submitted || !hasMore) return;
    fetchSearchPage(submitted, page + 1);
  }, [category, hasMore, page, submitted, fetchCategoryPage, fetchSearchPage]);

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

  const showTabs = !editing;
  const showCards = !editing;

  return (
    <div className="min-h-dvh bg-[#FAFAFA] pb-[91px]">
      <SearchPageHeader
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        showTabs={showTabs}
        onInputFocus={() => setEditing(true)}
        onInputBlur={() => setEditing(false)}
        onCategoryChange={handleCategoryChange}
      />

      {showCards && (
        <div className="mx-auto w-[393px] space-y-[25px] px-7 py-4">
          {items.map((it) => (
            <Link key={it.id} to={`/news/detail/${it.id}`} className="block">
              <HotNewsCard
                title={it.title}
                desc={it.desc}
                categories={it.categories}
                thumbnail={it.thumbnail}
              />
            </Link>
          ))}

          {category !== "전체" && (
            <div ref={sentinelRef} className="h-1 w-full" />
          )}
        </div>
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-[90px] h-[72px] bg-gradient-to-b from-transparent to-[#FAFAFA]" />
    </div>
  );
}
