import { useEffect } from "react";
import Header from "../components/common/Header";
import { NewsDetail } from "../components/detail/NewsDetail";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/useStore";
import { HowtoNews } from "../components/detail/HowToNews";

export default function Detail() {
  const setBottomNav: (value: boolean) => void = useStore(
    (state) => state.setBottomNav,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setBottomNav(false);
    return () => setBottomNav(true);
  }, [setBottomNav]);
  return (
    <article className="flex w-full flex-col bg-[#FAFAFA]">
      <Header
        title="뉴스 보기"
        onBack={() => {
          navigate(-1);
        }}
      />
      <NewsDetail />
      <HowtoNews />
      <div className="fixed bottom-[90px] left-1/2 z-10 h-[72px] w-full -translate-x-1/2 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
    </article>
  );
}
