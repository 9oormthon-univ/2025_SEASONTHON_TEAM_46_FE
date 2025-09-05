import CommonHeader from "../components/common/Header";
import { Activity } from "../components/my/Activity";
import { Profile } from "../components/my/Profile";
import { ProfileData } from "../constant/ProfileData";
export default function MyPage() {
  return (
    <article className="flex h-screen w-full flex-col items-center bg-[#FAFAFA]">
      <CommonHeader title="마이페이지" />
      <Profile {...ProfileData} />
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
