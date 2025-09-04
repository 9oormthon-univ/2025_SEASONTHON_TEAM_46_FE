import SearchBar from "./SearchBar";
import CategoryTabs, { type CategoryKey } from "./CategoryTabs";
import { useState } from "react";
import Header from "../Header";

export default function SearchPageHeader() {
  const [cat, setCat] = useState<CategoryKey>("전체");
  return (
    <div className="bg-white">
      <Header title="뉴스 탐색" className="mb-4" />
      <div className="flex flex-col gap-[18px] px-7">
        <SearchBar />
        <CategoryTabs value={cat} onChange={setCat} />
      </div>
    </div>
  );
}
