import Header from "../components/Header";
import SearchBar from "../components/search/SearchBar";

export default function SearchPage() {
  return (
    <div>
      <Header title="뉴스 탐색" />
      <div className="px-7">
        <SearchBar />
      </div>
    </div>
  );
}
