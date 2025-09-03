import SearchSvg from "../../assets/icons/search.svg";

export function SearchBar() {
  return (
    <div className="flex h-[56px] w-[337px] items-center gap-[13px] rounded-[50px] bg-[rgba(255,255,255,0.95)] px-[27px]">
      <img src={SearchSvg} alt="Search" />
      <input
        type="text"
        placeholder="뉴스를 검색해보세요."
        className="w-full bg-transparent text-[16px] font-[500] text-[rgba(42,42,42)] outline-none placeholder:text-[rgba(42,42,42,0.30)]"
      />
    </div>
  );
}
