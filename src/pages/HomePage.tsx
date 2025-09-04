import { Body } from "../components/main/Body";
import { Header } from "../components/main/Header";

export default function HomePage() {
  return (
    <article className="pb-[91px]">
      <Header />
      <Body />
      <div className="fixed bottom-[90px] left-1/2 z-10 h-[72px] w-full -translate-x-1/2 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
    </article>
  );
}
