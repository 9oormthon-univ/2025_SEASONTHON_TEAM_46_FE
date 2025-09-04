import { useState } from "react";
import { SearchBar } from "../common/SearchBar";

export function Header() {
  const [searchText, setSearchText] = useState<string>("");
  return (
    <header className="z-[1] flex h-[346px] w-full flex-col items-center gap-[27px] bg-gradient-to-b from-[#3D57FE] to-[#7F81FF] px-[28px] py-[58px]">
      <h1 className="w-[337px] text-[32px] font-bold text-white">NewsTHINKY</h1>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onClick={() => {}}
      />
      <div className="flex h-[22px] items-end gap-[88px]">
        <p className="text-[18px] font-bold text-white">
          이번주 내 뉴스 소비패턴은?
        </p>
        <button
          className="cursor-pointer text-[14px] font-[500] text-white/60"
          onClick={() => {}}
        >
          바로가기
        </button>
      </div>
    </header>
  );
}
