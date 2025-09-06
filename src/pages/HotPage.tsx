import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import HotNewsCard from "../components/hot/HotNewsCard";
import hotNews1 from "../assets/images/default_test_img.png";

import type { HotNewsRes } from "../types/hot";
import { fetchHotNewsList } from "../api/hot/getHotNewsList";
import { Link } from "react-router-dom";

type Badge = { text: string; color: string; bgColor: string };

type CardItem = {
  id: number;
  rank: number;
  title: string;
  desc: string;
  category: Badge | null;
  sentiment: Badge | null;
  thumbnail: string;
};

export default function HotPage() {
  const [items, setItems] = useState<CardItem[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const list: HotNewsRes[] = await fetchHotNewsList();

        const mapped: CardItem[] = list.map((d, idx) => {
          const categoryBadge: Badge | null = d.categoryMeta?.text
            ? {
                text: d.categoryMeta.text,
                color: d.categoryMeta.color ?? "#979797",
                bgColor: d.categoryMeta.bgColor ?? "#ECECEC",
              }
            : null;

          const sentimentBadge: Badge | null = d.sentimentMeta?.text
            ? {
                text: d.sentimentMeta.text,
                color: d.sentimentMeta.color ?? "#979797",
                bgColor: d.sentimentMeta.bgColor ?? "#ECECEC",
              }
            : null;

          return {
            id: d.id,
            rank: idx + 1,
            title: d.title,
            desc: d.outlet,
            category: categoryBadge,
            sentiment: sentimentBadge,
            thumbnail: d.image || hotNews1,
          };
        });
        setItems(mapped);
      } catch (err: unknown) {
        let message = "핫뉴스 목록을 불러오지 못했습니다.";
        if (typeof err === "string") message = err;
        else if (err instanceof Error) message = err.message || message;

        setErr(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-dvh bg-[#FAFAFA]">
      <Header title="이번주 핫뉴스 TOP 10" />
      <div className="relative flex w-full flex-col items-center pb-[91px] pt-9">
        <div className="relative flex w-full flex-col items-center pb-[91px] pt-9">
          <div className="flex w-[393px] flex-col items-center gap-[25px]">
            {loading && <div>불러오는 중…</div>}
            {err && <div className="text-red-500">{err}</div>}

            {items.map((it) => (
              <Link key={it.id} to={`/news/detail/${it.id}`} className="block">
                <HotNewsCard
                  rank={it.rank}
                  title={it.title}
                  desc={it.desc}
                  thumbnail={it.thumbnail}
                  category={it.category}
                  sentiment={it.sentiment}
                />
              </Link>
            ))}
          </div>

          <div className="pointer-events-none fixed bottom-[90px] left-1/2 h-[72px] w-[394px] -translate-x-1/2 bg-gradient-to-b from-transparent to-[#FAFAFA]" />
        </div>
      </div>
    </div>
  );
}
