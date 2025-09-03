import CharacterSvg from "../../assets/icons/character.svg";
import { DonutChart } from "./DonutChart";

export function BadNewsView() {
  return (
    <article
      className="bg-white/96 absolute top-[-60px] h-[129px] w-[337px] flex-shrink-0 rounded-[10px] border-[1px] border-white bg-white px-[25px] pt-[17px]"
      style={{ boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.07)" }}
    >
      <div className="flex gap-[62px]">
        <section className="flex flex-col gap-[10px]">
          <div className="flex h-[28px] w-[134px] flex-shrink-0 items-center justify-center rounded-[50px] bg-[rgba(255,118,118,0.26)]">
            <p className="text-[12px] font-[500] leading-[140%] tracking-[-0.24px] text-[rgba(255,101,101,0.8)]">
              🚨 부정 뉴스 과다 섭취
            </p>
          </div>
          <p className="w-[127px] text-[20px] font-[700] leading-[135%] text-[#2A2A2A]">
            이번주 부정뉴스
            <span className="font-[800] text-[#3D57FE]">60%</span>소비
          </p>
        </section>
        <section className="relative">
          <DonutChart size={88} strokeWidth={8} progress={60}>
            <img src={CharacterSvg} alt="Character" width={70} height={70} />
          </DonutChart>
        </section>
      </div>
    </article>
  );
}
