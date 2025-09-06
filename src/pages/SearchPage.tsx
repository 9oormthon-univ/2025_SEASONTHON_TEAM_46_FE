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

type CategoryTag = { text: string; color: string; bgColor: string } | null;

type Item = {
  id: number;
  title: string;
  desc: string;
  category: CategoryTag;
  sentiment: CategoryTag;
  thumbnail: string;
};

type SearchNewsRow = SearchNewsItem & {
  summary?: string | null;
  outlet?: string | null;
  thumbnail?: string | null;
  categoryMeta?: {
    text?: string | null;
    color?: string | null;
    bgColor?: string | null;
  } | null;
  sentimentMeta?: {
    text?: string | null;
    color?: string | null;
    bgColor?: string | null;
  } | null;
};

type AllNewsRow = {
  id: number;
  title: string;
  outlet?: string | null;
  summary?: string | null;
  thumbnail?: string | null;
  categoryMeta?: {
    text?: string | null;
    color?: string | null;
    bgColor?: string | null;
  } | null;
  sentimentMeta?: {
    text?: string | null;
    color?: string | null;
    bgColor?: string | null;
  } | null;
};
const PAGE_SIZE = 10;
function tabToKoreanLabel(cat: CategoryKey): string | null {
  switch (cat) {
    case "정치":
      return "정치";
    case "세계":
      return "세계";
    case "IT":
      return "IT";
    case "생활":
      return "문화";
    case "사회":
      return "사회";
    default:
      return null;
  }
}
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

const toCardItemsFromPaged = (arr: SearchNewsRow[]): Item[] =>
  (arr ?? []).map((d) => ({
    id: d.id,
    title: d.title,
    desc: (d.summary ?? d.outlet ?? "").trim(),
    thumbnail: d.thumbnail ?? hotNews1,
    category: d.categoryMeta?.text
      ? {
          text: d.categoryMeta.text,
          color: d.categoryMeta.color ?? "#979797",
          bgColor: d.categoryMeta.bgColor ?? "#ECECEC",
        }
      : null,
    sentiment: d.sentimentMeta?.text
      ? {
          text: d.sentimentMeta.text,
          color: d.sentimentMeta.color ?? "#979797",
          bgColor: d.sentimentMeta.bgColor ?? "#ECECEC",
        }
      : null,
  }));

const toCardItemsFromAll = (arr: AllNewsRow[]): Item[] =>
  (arr ?? []).map((d) => ({
    id: d.id,
    title: d.title,
    desc: (d.summary ?? d.outlet ?? "").trim(),
    thumbnail: d.thumbnail ?? hotNews1,
    category: d.categoryMeta?.text
      ? {
          text: d.categoryMeta.text,
          color: d.categoryMeta.color ?? "#979797",
          bgColor: d.categoryMeta.bgColor ?? "#ECECEC",
        }
      : null,
    sentiment: d.sentimentMeta?.text
      ? {
          text: d.sentimentMeta.text,
          color: d.sentimentMeta.color ?? "#979797",
          bgColor: d.sentimentMeta.bgColor ?? "#ECECEC",
        }
      : null,
  }));

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [editing, setEditing] = useState(false);
  const [category, setCategory] = useState<CategoryKey>("전체");
  const reqIdRef = useRef(0);

  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const fetchingRef = useRef(false);

  const fetchAll = useCallback(async () => {
    const myId = ++reqIdRef.current;
    try {
      const res = await api.get("/api/news/all");
      const next = toCardItemsFromAll(res.data || []);
      if (myId !== reqIdRef.current) return;
      setItems(next);
      setPage(0);
      setHasMore(false);
    } catch {
      if (myId !== reqIdRef.current) return;
      setItems([]);
      setPage(0);
      setHasMore(false);
    }
  }, []);

  const fetchCategoryBrowse = useCallback(
    async (cat: CategoryKey, p: number) => {
      const code = mapCategoryKeyToServer(cat);
      if (!code) return;
      const myId = ++reqIdRef.current;

      try {
        const res = await getNewsByCategory(code, p, PAGE_SIZE);
        const next = toCardItemsFromPaged(res.content || []);
        if (myId !== reqIdRef.current) return;
        setItems((prev) => (p === 0 ? next : prev.concat(next)));
        setHasMore(!res.last);
        setPage(res.page);
      } catch {
        if (myId !== reqIdRef.current) return;
        if (p === 0) setItems([]);
        setHasMore(false);
      }
    },
    [],
  );
  const matchSelectedTab = useCallback(
    (it: Item) => {
      const want = tabToKoreanLabel(category);
      if (!want) return true;
      const got = it.category?.text || "";
      return got === want;
    },
    [category],
  );

  const fetchSearch = useCallback(
    async (kw: string, p: number) => {
      if (!kw) return;
      const myId = ++reqIdRef.current;

      try {
        const code = mapCategoryKeyToServer(category) || undefined;
        const res = await searchNews(kw, p, PAGE_SIZE, code);
        const nextAll = toCardItemsFromPaged(res.content || []);
        const next =
          category === "전체" ? nextAll : nextAll.filter(matchSelectedTab);

        if (myId !== reqIdRef.current) return;
        setItems((prev) => (p === 0 ? next : prev.concat(next)));
        setHasMore(!res.last);
        setPage(res.page);
      } catch {
        if (myId !== reqIdRef.current) return;
        if (p === 0) setItems([]);
        setHasMore(false);
      }
    },
    [category, matchSelectedTab],
  );

  useEffect(() => {
    ++reqIdRef.current;
    setItems([]);
    setPage(0);
    setHasMore(false);

    if (submitted) {
      fetchSearch(submitted, 0);
    } else {
      if (category === "전체") {
        fetchAll();
      } else {
        fetchCategoryBrowse(category, 0);
      }
    }
  }, [category, submitted, fetchAll, fetchCategoryBrowse, fetchSearch]);

  const handleSubmit = useCallback(
    (q: string) => {
      const kw = q.trim();
      setSubmitted(kw);
      setEditing(false);

      if (category !== "전체") {
        setCategory("전체");
      }
    },
    [category],
  );

  const handleCategoryChange = useCallback((next: CategoryKey) => {
    setCategory(next);
  }, []);

  const loadMore = useCallback(() => {
    if (fetchingRef.current || !hasMore) return;

    if (!submitted) {
      if (category !== "전체") fetchCategoryBrowse(category, page + 1);
      return;
    }

    fetchSearch(submitted, page + 1);
  }, [submitted, category, hasMore, page, fetchCategoryBrowse, fetchSearch]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
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
          {!submitted && items.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-400">
              뉴스가 없습니다.
            </p>
          )}

          {items.map((it) => (
            <Link key={it.id} to={`/news/detail/${it.id}`} className="block">
              <HotNewsCard
                title={it.title}
                desc={it.desc}
                category={it.category}
                thumbnail={it.thumbnail}
                sentiment={it.sentiment}
              />
            </Link>
          ))}

          {(submitted || category !== "전체") && (
            <div ref={sentinelRef} className="h-1 w-full" />
          )}
        </div>
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-[90px] h-[72px] bg-gradient-to-b from-transparent to-[#FAFAFA]" />
    </div>
  );
}
