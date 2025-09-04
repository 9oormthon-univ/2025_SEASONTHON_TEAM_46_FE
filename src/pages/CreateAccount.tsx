import { useEffect, useState } from "react";
import { Header } from "../components/common/Header";
import { useStore } from "../stores/useStore";
import { useNavigate } from "react-router-dom";
import DefaultSvg from "../assets/icons/default_profile.svg";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>("");
  const [isNickNameAuth, setIsNickNameAuth] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(DefaultSvg);
  const setBottomNav: (value: boolean) => void = useStore(
    (state) => state.setBottomNav,
  );

  useEffect(() => {
    setBottomNav(false);
    return () => setBottomNav(true);
  }, [setBottomNav]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc(e.target.result);
      }
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <article className="flex h-screen flex-col items-center bg-[#FAFAFA] pt-[201px]">
      <Header text="계정 생성" onClick={() => {}} />
      <label htmlFor="profile-upload">
        <img
          src={imgSrc}
          alt="Default"
          width={117}
          height={117}
          className="h-[117px] w-[117px] rounded-[50%]"
        />
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <div className="mt-[23px] flex w-[337px] flex-col items-start gap-[8px]">
        <p className="text-[16px] font-[500] text-[#595959]">닉네임</p>
        <div className="flex h-[56px] w-full items-center gap-[8px] rounded-[10px] bg-[#F2F2F2] px-[16.5px]">
          <input
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
              setIsFilled(!!e.target.value);
            }}
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="h-full w-full border-none bg-transparent outline-none"
          />
          <button
            className={`h-[24px] w-[42px] flex-shrink-0 rounded-[50px] ${isFilled ? "bg-[#3D57FE]" : "bg-white"}`}
            onClick={() => setIsNickNameAuth(true)}
          >
            <p
              className={`text-[12px] font-[500] ${isFilled ? "text-white" : "text-[#D9D9D9]"}`}
            >
              확인
            </p>
          </button>
        </div>
      </div>
      <button
        className={`fixed bottom-[55px] h-[60px] w-[337px] rounded-[10px] ${isNickNameAuth ? "bg-[#3D57FE]" : "bg-[#EAEAEA]"}`}
        disabled={!isNickNameAuth}
        onClick={() => navigate("/home")}
      >
        <p
          className={`text-[18px] font-[500] tracking-[-0.36px] ${isNickNameAuth ? "text-white" : "text-[#B3B3B3]"}`}
        >
          완료
        </p>
      </button>
    </article>
  );
}
