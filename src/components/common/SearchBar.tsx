import SearchSvg from "../../assets/icons/search.svg";

/**
 * SearchBar component for searching news articles.
 * @param searchText - The text to search for.
 * @param setSearchText - The function to update the search text.
 * @param onClick - The function to call when the search button is clicked.
 * @returns {JSX.Element}
 */

export function SearchBar({
  searchText,
  setSearchText,
  onClick,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  onClick: () => void;
}) {
  return (
    <div className="flex h-[56px] w-[337px] items-center gap-[13px] rounded-[50px] bg-white/95 px-[27px]">
      <img
        src={SearchSvg}
        alt="Search"
        onClick={onClick}
        className="cursor-pointer"
      />
      <input
        value={searchText}
        type="text"
        placeholder="뉴스를 검색해보세요."
        onChange={(event) => setSearchText(event.target.value)}
        className="w-full bg-transparent text-[16px] font-[500] text-[rgba(42,42,42)] outline-none placeholder:text-[rgba(42,42,42,0.30)]"
      />
    </div>
  );
}
