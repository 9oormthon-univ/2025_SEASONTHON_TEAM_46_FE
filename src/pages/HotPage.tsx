import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import HotNewsCard from "../components/hot/HotNewsCard";
import hotNews1 from "../assets/images/hot_news1.png";

import type { HotNewsRes } from "../types/hot";
import { fetchHotNewsList } from "../api/hot/getHotNewsList";

type Badge = { text: string; color: string; bgColor: string };
type CardItem = {
  id: number;
  rank: number;
  title: string;
  desc: string;
  categories: Badge[];
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
        console.log(list);
        const mapped: CardItem[] = list.map((d, idx) => ({
          id: d.id,
          rank: idx + 1,
          title: d.title,
          desc: `${d.outlet} · ❤️ ${d.likeCount.toLocaleString()}`,
          categories: [
            { text: d.outlet, color: "#7F81FF", bgColor: "#EEF0FF" },
            {
              text: d.orientation || "NEWS",
              color: "#979797",
              bgColor: "#ECECEC",
            },
          ],
          thumbnail: hotNews1,
        }));

        setItems(mapped);
      } catch (err: unknown) {
        let message = "핫뉴스 목록을 불러오지 못했습니다.";
        if (typeof err === "string") {
          message = err;
        } else if (err instanceof Error) {
          message = err.message || message;
        }
        setErr(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-[#FAFAFA]">
      <Header title="이번주 핫뉴스 TOP 10" />
      <div className="relative flex w-full flex-col items-center pb-[90px] pt-9">
        <div className="flex w-[394px] flex-col items-center gap-[25px]">
          {loading && <div>불러오는 중…</div>}
          {err && <div className="text-red-500">{err}</div>}

          {items.map((it) => (
            <HotNewsCard
              key={it.id}
              rank={it.rank}
              title={it.title}
              desc={it.desc}
              categories={it.categories}
              thumbnail={it.thumbnail}
            />
          ))}
        </div>

        <div className="pointer-events-none fixed bottom-[90px] left-1/2 h-[72px] w-[394px] -translate-x-1/2 bg-gradient-to-b from-transparent to-[#FAFAFA]" />
      </div>
    </div>
  );
}
