import { EMOTION_META, type EmotionKey } from "../../constant/emotionData";
import { Category } from "../common/Category";
import HotNewsCard from "../hot/HotNewsCard";
import hotNewsThumb from "../../assets/images/hot_news1.png";
type Props = {
  open: boolean;
  emotion: EmotionKey | null;
  onClose: () => void;
};

export default function EmotionToastSheet({ open, emotion, onClose }: Props) {
  const meta = emotion ? EMOTION_META[emotion] : null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#2A2A2A]/80 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed bottom-0 left-1/2 z-50 w-[394px] -translate-x-1/2 transform transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!open}
      >
        <div className="relative mx-auto h-[438px] w-[394px] rounded-t-[20px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.04)]">
          <div className="flex justify-center pt-6">
            <div className="h-[5px] w-[40px] rounded-full bg-[#EAEAEA]" />
          </div>

          <h3 className="[font-family:'Pretendard Variable'] mt-4 w-full text-center text-[24px] font-bold leading-[160%] tracking-[-0.48px] text-black">
            {emotion ?? ""}
          </h3>

          <div className="mt-4 flex w-full flex-wrap justify-center gap-[5px] px-6">
            {meta?.subs.map((s) => (
              <Category key={s} text={s} color={meta.color} />
            ))}
          </div>

          <div className="mx-7 mt-[25px] flex items-center gap-3 rounded-[14px] bg-[#F9F9F9] p-4">
            <HotNewsCard
              title="‘케데헌’ 열풍 이정도야?… 외국인 136만명 서울 몰려왔다"
              desc="[이데일리 함지현 기자] 서울시는 7월 ..."
              categories={[
                // 첫 번째 카테고리는 현재 감정의 대표 색상 사용(예: 희망 → #7BEAD7)
                meta
                  ? { text: meta.subs[0] ?? "성취", color: meta.color }
                  : { text: "성취", color: "#7BEAD7" },
                // 두 번째는 회색 계열
                { text: "사회", color: "#8C8C8C" },
              ]}
              thumbnail={hotNewsThumb} // 또는 외부 URL
              className="w-full"
            />
          </div>

          {/* 닫기 버튼 — 65px 아래 */}
          <div className="mt-[65px] flex w-full justify-center">
            <button
              type="button"
              onClick={onClose}
              className="h-[52px] w-[332px] rounded-[10px] bg-[#EAEAEA] text-[16px] font-semibold text-[#2A2A2A]"
            >
              닫기
            </button>
          </div>

          {/* 상단 옅은 틴트(선택) */}
          {meta && (
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[140px] rounded-t-[20px]" />
          )}
        </div>
      </div>
    </>
  );
}
