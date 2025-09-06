import { useState } from "react";
import SearchBar from "./SearchBar";
import CategoryTabs, { type CategoryKey } from "./CategoryTabs";
import Header from "../common/Header";

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  onSubmit: (q: string) => void;
  showTabs: boolean;
  onCategoryChange?: (cat: CategoryKey) => void;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  className?: string;
};

export default function SearchPageHeader({
  query,
  onQueryChange,
  onSubmit,
  showTabs,
  onCategoryChange,
  onInputFocus,
  onInputBlur,
  className = "",
}: Props) {
  const [cat, setCat] = useState<CategoryKey>("전체");

  return (
    <div className={`rounded-b-[20px] bg-white ${className}`}>
      <Header title="뉴스 탐색" className="mb-4" />
      <div className="flex flex-col gap-[18px] px-7 pb-[18px]">
        <SearchBar
          value={query}
          onChange={onQueryChange}
          onSubmit={onSubmit}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        {showTabs && (
          <CategoryTabs
            value={cat}
            onChange={(next) => {
              setCat(next);
              onCategoryChange?.(next);
            }}
          />
        )}
      </div>
    </div>
  );
}
