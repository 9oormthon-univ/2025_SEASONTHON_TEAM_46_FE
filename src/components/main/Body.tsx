import { BadNewsView } from "./BadNewsView";
import { HotNews } from "./HotNews";
import { NewNews } from "./NewNews";
import { Push } from "./Push";

export function Body() {
  return (
    <main className="relative mt-[-20px] flex w-full flex-col items-center rounded-t-[20px] bg-white pb-[30px] pt-[105px]">
      <HotNews />
      <BadNewsView />
      <NewNews />
      <div className="h-[12px] w-full bg-[#FAFAFA]"></div>
      <Push />
    </main>
  );
}
