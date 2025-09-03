import { HotNews } from "./HotNews";
import { NewNews } from "./NewNews";
import { Push } from "./Push";

export function Body() {
  return (
    <main className="flex w-full flex-col items-center border-t-[20px] border-[#eee] bg-white pt-[105px]">
      <HotNews />
      <NewNews />
      <div className="h-[12px] w-full bg-[#FAFAFA]"></div>
      <Push />
    </main>
  );
}
