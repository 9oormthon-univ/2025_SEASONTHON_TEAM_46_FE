import { BadNewsView } from "./BadNewsView";
import { HotNews } from "./HotNews";
import { NewNews } from "./NewNews";
import { Push } from "./Push";
import api from "../../hooks/api";
import { useEffect, useState } from "react";
import type { DataProps } from "../../types/DataProps";

export function Body() {
  const [data, setData] = useState<DataProps[]>([]);
  useEffect(() => {
    api.get("/api/news/all").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <main className="relative mt-[-20px] flex w-full flex-col items-center rounded-t-[20px] bg-white pb-[30px] pt-[105px]">
      <HotNews data={data} />
      <BadNewsView />
      <NewNews data={data} />
      <div className="h-[12px] w-full bg-[#FAFAFA]"></div>
      <Push text={""} />
    </main>
  );
}
