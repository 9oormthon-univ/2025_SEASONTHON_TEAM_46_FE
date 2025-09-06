import BiasCharacterSvg from "../../assets/icons/bias.svg";
import { useNavigate } from "react-router-dom";

export function BottomSheetDetail({
  setOpenSheet,
}: {
  setOpenSheet: (value: boolean) => void;
}) {
  const navigate = useNavigate();
  return (
    <article className="mt-[30px] flex w-[332px] flex-col items-center gap-[18px]">
      <section className="flex w-[263px] flex-col items-center gap-[15px]">
        <div className="flex flex-col items-center gap-[8px]">
          <div className="h-[24px] w-[72px] flex-shrink-0 items-center rounded-[50px] bg-[rgba(255,118,118,0.26)]">
            <p className="text-[12px] font-[500] leading-[160%] tracking-[-0.24px] text-[#F63E3E]">
              편향 위험
            </p>
          </div>
          <div className="flex flex-col items-center gap-[4px]">
            <p className="text-[22px] font-bold leading-[140%] tracking-[-0.44px] text-[#000]">
              편향된 감정 소비가 감지됐어!
            </p>
            <p className="text-[14px] font-[500] leading-[140%] tracking-[-0.28px] text-[#B3B3B3]">
              리포트 지금 바로 확인하러 가볼까?
            </p>
          </div>
        </div>
        <img
          src={BiasCharacterSvg}
          alt="편향 소비 캐릭터"
          width={163}
          height={163}
        />
      </section>
      <section className="flex items-center gap-[8px]">
        <button
          onClick={() => setOpenSheet(false)}
          className="h-[52px] w-[162px] flex-shrink-0 rounded-[10px] bg-[#EAEAEA] text-[16px] font-[500] tracking-[-0.32px] text-[#505050]"
        >
          닫기
        </button>
        <button
          onClick={() => {
            setOpenSheet(false);
            navigate("/report");
          }}
          className="h-[52px] w-[162px] flex-shrink-0 rounded-[10px] bg-[#3D57FE] text-[16px] font-[500] tracking-[-0.32px] text-white"
        >
          확인
        </button>
      </section>
    </article>
  );
}
