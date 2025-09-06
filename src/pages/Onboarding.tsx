import { useEffect, useState } from "react";
import { useStore } from "../stores/useStore";
import { useNavigate } from "react-router-dom";
import OnBoarding1 from "../assets/icons/onboarding1.svg";
import OnBoarding2 from "../assets/icons/onboarding2.svg";
import OnBoarding3 from "../assets/icons/onboarding3.svg";
import OnBoarding4 from "../assets/icons/onboarding4.svg";

const slides = [
  {
    title: `뉴스, 감정에 휘둘리지 않고\n건강하게 소비해봐!`,
    subtitle: "newsTHINKY가 균형 잡힌 시선을 지켜줄게",
    img: OnBoarding1,
  },
  {
    title: "내가 어떤 뉴스를 많이 보는지,\n감정까지 분석해준다고구",
    subtitle: "긍정·부정·중립 감정 리포트를 한눈에 확인",
    img: OnBoarding2,
  },
  {
    title: "부정 뉴스 과다 소비?\nTHINKY가 알려줄게",
    subtitle: "불안만 남는 뉴스에 치우치지 않도록 스마트 알림",
    img: OnBoarding3,
  },
  {
    title: "다양한 시선의 뉴스,\n균형 있게 만나봐!",
    subtitle: "이제 newsTHINKY와 함께 해볼까?",
    img: OnBoarding4,
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const setBottomNav: (value: boolean) => void = useStore(
    (state) => state.setBottomNav,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setBottomNav(false);
    return () => setBottomNav(true);
  }, [setBottomNav]);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else if (step === slides.length - 1) {
      localStorage.setItem("onboardingSeen", "true");
      navigate("/home");
    }
  };

  return (
    <article className="flex h-full w-full flex-col items-center justify-between">
      <button
        className="fixed left-[29px] top-[62px] h-[16px] w-[18px] text-[#7F81FFE5]"
        onClick={() => (step === 0 ? navigate("/") : setStep(step - 1))}
      >
        ←
      </button>

      <div className="mt-[154px] flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center gap-[8px]">
          <h2 className="whitespace-pre-line text-[24px] font-bold leading-[140%] tracking-[-0.48px] text-[#2A2A2A]">
            {slides[step].title}
          </h2>
          <p className="whitespace-pre-line text-[14px] font-[500] tracking-[-0.28px] text-[#B3B3B3]">
            {slides[step].subtitle}
          </p>
        </div>
      </div>
      <img
        src={slides[step].img}
        alt="온보딩 이미지"
        className="mt-[50px] object-contain"
      />
      <div className="mt-6 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === step
                ? "w-[15px] bg-gradient-to-r from-[#3D57FE] to-[#7F81FF]"
                : "w-2 bg-[#D9D9D9]"
            }`}
          />
        ))}
      </div>
      <button
        onClick={handleNext}
        className={`fixed bottom-[55px] h-[60px] w-[337px] rounded-[10px] font-[18px] font-[600] text-white ${
          step === slides.length - 1
            ? "bg-[#3D57FE]"
            : "bg-[#EAEAEA] font-[500] text-[#505050]"
        }`}
      >
        {step === slides.length - 1 ? "newsTHINKY 시작하기" : "다음"}
      </button>
    </article>
  );
}
