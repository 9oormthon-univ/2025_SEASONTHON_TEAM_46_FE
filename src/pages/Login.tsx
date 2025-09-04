import { useEffect } from "react";
import LogoSvg from "../assets/icons/logo.svg";
import KakaoSvg from "../assets/icons/kakao.svg";
import { useStore } from "../stores/useStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const setBottomNav: (value: boolean) => void = useStore(
    (state) => state.setBottomNav,
  );

  useEffect(() => {
    setBottomNav(false);
    return () => setBottomNav(true);
  }, [setBottomNav]);
  return (
    <article
      className="flex h-screen w-full flex-col items-center pt-[274px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(61, 87, 254, 0.25) 0%, rgba(127, 129, 255, 0.25) 20%, rgba(255, 255, 255, 0.25) 65%)",
      }}
    >
      <img src={LogoSvg} alt="Logo" width={119} height={126} />
      <section className="mt-[34px]">
        <div className="flex flex-col gap-[12px]">
          <p className="text-[32px] font-[800] leading-[75%] text-[#2A2A2A]">
            NewsTHINKY
          </p>
          <p className="text-[14px] font-[500] text-[#B3B3B3]">
            편향을 멈추고 올바른 세상으로
          </p>
        </div>
      </section>
      <section className="mt-[134px] flex flex-col items-center gap-[15px]">
        <button
          className="flex h-[60px] w-[336px] flex-shrink-0 items-center justify-center gap-[7px] rounded-[10px] bg-[#FEE500]"
          onClick={() => {
            navigate("/create-account");
          }}
        >
          <img src={KakaoSvg} alt="Kakao" width={22} height={16} />
          <p className="text-[18px] font-[500] tracking-[-0.36px] text-[#191600]">
            카카오로 로그인
          </p>
        </button>
        <button
          className="h-[60px] w-[336px] flex-shrink-0 items-center justify-center rounded-[10px] bg-[#3D57FE]"
          onClick={() => {
            alert("카카오 로그인을 이용해주세요.");
          }}
        >
          <p className="text-[18px] font-[500] tracking-[-0.36px] text-white">
            회원가입
          </p>
        </button>
        <p
          className="cursor-pointer text-[16px] font-[500] tracking-[-0.36px] text-[#B3B3B3] underline"
          onClick={() => {
            alert("카카오 로그인을 이용해주세요.");
          }}
        >
          로그인
        </p>
      </section>
    </article>
  );
}
