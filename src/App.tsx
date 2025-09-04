import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "./components/common/BottomNav";
import { useStore } from "./stores/useStore";
import HomePage from "./pages/HomePage";
import HotPage from "./pages/HotPage";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

function App() {
  const showBottomNav: boolean = useStore((state) => state.showBottomNav);
  return (
    <BrowserRouter>
      <div className="relative mx-auto min-h-screen w-[393px]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/hot" element={<HotPage />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
        {showBottomNav && <BottomNav />}
      </div>
    </BrowserRouter>
  );
}

export default App;
