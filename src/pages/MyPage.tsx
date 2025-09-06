import { useEffect, useState } from "react";
import CommonHeader from "../components/common/Header";
import { Activity } from "../components/my/Activity";
import { Profile } from "../components/my/Profile";
import api from "../hooks/api";
import DefaultSvg from "../assets/icons/default_profile.svg";

interface ProfileDataProps {
  nickname: string;
  profileUrl: string;
  email: string;
  role: string;
}

export default function MyPage() {
  const [profileData, setProfileData] = useState<ProfileDataProps>();

  useEffect(() => {
    api.get("/user/info").then((res) => {
      setProfileData(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <article className="flex h-screen w-full flex-col items-center bg-[#FAFAFA]">
      <CommonHeader title="마이페이지" />
      <Profile
        imgSrc={profileData?.profileUrl || DefaultSvg}
        name={profileData?.nickname || "사용자"}
        email={profileData?.email || "Thinky093@gmail.com"}
        role={profileData?.role || "뉴스 편식가"}
      />
      <Activity />
      <section className="relative mt-[12px] flex h-screen w-full justify-center bg-white">
        <div className="fixed bottom-[117px] flex gap-[15px]">
          <p className="cursor-pointer text-[14px] font-[500] leading-[140%] text-[#B3B3B3]">
            로그아웃
          </p>
          <p className="cursor-pointer text-[14px] font-[500] leading-[140%] text-[#B3B3B3]">
            회원탈퇴
          </p>
        </div>
      </section>
    </article>
  );
}
