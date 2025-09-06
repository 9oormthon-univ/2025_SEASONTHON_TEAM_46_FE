import HotNewsCard from "../components/hot/HotNewsCard";
import { FilterHeader } from "../components/my/FilterHeader";
import { useEffect, useState } from "react";
import { useStore } from "../stores/useStore";
import api from "../hooks/api";

type Item = {
  id: number;
  image: string;
  likeCount: number;
  orientation: string;
  title: string;
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
        const res = await api.get(`my-likes`);
        setNewsPick(res.data);
        console.log(res.data);
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
          <HotNewsCard
            key={it.id}
            title={it.title}
            desc={it.orientation}
            categories={[
              {
                text: "논란",
                color: "#F63E3E",
                bgColor: "rgba(255, 118, 118, 0.26)",
              },
            ]}
            thumbnail={it.image}
          />
        ))}
      </div>
    </article>
  );
}
