import { useEffect } from "react";
import { Header } from "../components/common/Header";
import { useStore } from "../stores/useStore";

export default function CreateAccount() {
  const setBottomNav: (value: boolean) => void = useStore(
    (state) => state.setBottomNav,
  );

  useEffect(() => {
    setBottomNav(false);
    return () => setBottomNav(true);
  }, [setBottomNav]);

  return (
    <article className="flex flex-col bg-[#FAFAFA]">
      <Header text="계정 생성" onClick={() => {}} />
    </article>
  );
}
