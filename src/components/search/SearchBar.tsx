import SearchIcon from "../../assets/icons/search.svg";

export default function SearchBar() {
  return (
    <div className="flex h-[56px] items-center gap-[13px] rounded-[50px] bg-[#FAFAFA] px-[27px]">
      <img src={SearchIcon} alt="" />
      <input
        type="text"
        placeholder="뉴스를 검색해보세요."
        className="min-w-0 flex-1 bg-transparent text-[16px] font-medium leading-normal text-black outline-none placeholder:font-medium placeholder:text-black/30"
      />
    </div>
  );
}
