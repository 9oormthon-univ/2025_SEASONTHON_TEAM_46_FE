import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "./components/common/BottomNav";
import { useStore } from "./stores/useStore";
import HomePage from "./pages/HomePage";
import HotPage from "./pages/HotPage";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import SearchPage from "./pages/SearchPage";
import Detail from "./pages/Detail";
import NewsPick from "./pages/NewsPick";
import LoginCallback from "./pages/LoginCallback";
import ReportPage from "./pages/ReportPage";

function App() {
  const showBottomNav: boolean = useStore((state) => state.showBottomNav);
  return (
    <BrowserRouter>
      <div className="relative mx-auto min-h-screen w-dvw">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/news/detail" element={<Detail />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/hot" element={<HotPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/news-pick" element={<NewsPick />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
        {showBottomNav && <BottomNav />}
      </div>
    </BrowserRouter>
  );
}

export default App;
