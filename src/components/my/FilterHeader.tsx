import { useState } from "react";
import type { CategoryKey } from "../search/CategoryTabs";
import Category from "./Category";
import Header from "../common/Header";

export function FilterHeader() {
  const [cat, setCat] = useState<CategoryKey>("전체");
  return (
    <header className={`rounded-b-[20px] bg-white`}>
      <Header title="뉴스픽" className="mb-4" />
      <div className="flex flex-col pb-[18px]">
        <Category value={cat} onChange={setCat} />
      </div>
    </header>
  );
}
