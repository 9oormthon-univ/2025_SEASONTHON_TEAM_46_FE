import HotNewsCard from "../components/hot/HotNewsCard";
import { FilterHeader } from "../components/my/FilterHeader";
import { useEffect, useState } from "react";
import { useStore } from "../stores/useStore";
import api from "../hooks/api";
import { Link } from "react-router-dom";

type CategoryTag = {
  text: string;
  color: string;
  bgColor: string;
} | null;

type Item = {
  id: number;
  title: string;
  desc: string;
  category: CategoryTag;
  sentiment: CategoryTag;
  thumbnail: string;
};

type LikedNewsRow = {
  id: number;
  image: string;
  likeCount: number;
  orientation: string;
  title: string;
  summary?: string;
  outlet?: string;
  categoryMeta?: { text: string; color: string; bgColor: string };
  sentimentMeta?: { text: string; color: string; bgColor: string };
};

export default function NewsPick() {
  const [newsPick, setNewsPick] = useState<Item[]>([]);
  const setBottomNav = useStore((state) => state.setBottomNav);

  useEffect(() => {
    setBottomNav(false);
    return () => setBottomNav(true);
  }, [setBottomNav]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await api.get<LikedNewsRow[]>(`my-likes`);

        const mappedData: Item[] = res.data.map((d) => ({
          id: d.id,
          title: d.title,
          desc: d.summary || d.outlet || d.orientation,
          thumbnail: d.image,
          category: d.categoryMeta?.text
            ? {
                text: d.categoryMeta.text,
                color: d.categoryMeta.color,
                bgColor: d.categoryMeta.bgColor,
              }
            : null,
          sentiment: d.sentimentMeta?.text
            ? {
                text: d.sentimentMeta.text,
                color: d.sentimentMeta.color,
                bgColor: d.sentimentMeta.bgColor,
              }
            : null,
        }));

        setNewsPick(mappedData);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };
    fetchLikeStatus();
  }, []);

  return (
    <article className="flex h-screen w-full flex-col items-center bg-[#FAFAFA]">
      <FilterHeader />
      <div className="mt-[29px] flex w-full flex-col items-center gap-[25px] pb-[20px]">
        {newsPick.map((it: Item) => (
          <Link key={it.id} to={`/news/detail/${it.id}`} className="block">
            <HotNewsCard
              title={it.title}
              desc={it.desc}
              thumbnail={it.thumbnail}
              category={it.category}
              sentiment={it.sentiment}
            />
          </Link>
        ))}
      </div>
    </article>
  );
}
