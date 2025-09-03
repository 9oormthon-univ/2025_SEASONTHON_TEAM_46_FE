import { NavLink } from "react-router-dom";

import HomeSvg from "../../assets/icons/home_logo.svg";
import HotSvg from "../../assets/icons/hot_logo.svg";
import MySvg from "../../assets/icons/my_page_logo.svg";

import HomeBlueSvg from "../../assets/icons/home_blue_logo.svg";
import HotBlueSvg from "../../assets/icons/hot_blue_logo.svg";
import MyBlueSvg from "../../assets/icons/my_page_blue_logo.svg";

export function BottomNav() {
  return (
    <div className="fixed bottom-0 flex h-[90px] w-[393px] justify-around border-t border-gray-200 bg-white">
      <NavLink
        to="/"
        className="flex flex-1 flex-col items-center justify-center text-[10px] font-semibold"
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? HomeBlueSvg : HomeSvg}
              alt="홈"
              className="h-6 w-6"
            />
            <span className={isActive ? "text-[#7F81FF]" : "text-[#B3B3B3]"}>
              홈
            </span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/hot"
        className="flex flex-1 flex-col items-center justify-center text-[10px] font-semibold"
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? HotBlueSvg : HotSvg}
              alt="HOT"
              className="h-6 w-6"
            />
            <span className={isActive ? "text-[#7F81FF]" : "text-[#B3B3B3]"}>
              HOT
            </span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/my"
        className="flex flex-1 flex-col items-center justify-center text-[10px] font-semibold"
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? MyBlueSvg : MySvg}
              alt="마이 페이지"
              className="h-6 w-6"
            />
            <span className={isActive ? "text-[#7F81FF]" : "text-[#B3B3B3]"}>
              마이 페이지
            </span>
          </>
        )}
      </NavLink>
    </div>
  );
}
