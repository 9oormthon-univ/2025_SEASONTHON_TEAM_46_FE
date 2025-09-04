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
    </article>
  );
}
