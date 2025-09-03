import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "./components/common/BottomNav";
import HomePage from "./pages/HomePage";
import HotPage from "./pages/HotPage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <div className="relative mx-auto min-h-screen w-[393px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hot" element={<HotPage />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
