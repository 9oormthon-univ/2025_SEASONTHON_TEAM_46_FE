import { useState } from "react";
import { SearchBar } from "../common/SearchBar";

export function Header() {
  const [searchText, setSearchText] = useState<string>("");
  return (
    <header className="flex h-[346px] w-[391px] flex-col gap-[27px] bg-gradient-to-b from-[#3D57FE] to-[#7F81FF] px-[28px] py-[58px]">
      <h1 className="text-[32px] font-bold text-white">NewsTHINKY</h1>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onClick={() => {}}
      />
    </header>
  );
}
