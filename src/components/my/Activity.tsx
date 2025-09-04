import ActivitySvg from "../../assets/icons/activity.svg";
import RightArrowSvg from "../../assets/icons/right-arrow.svg";

export function Activity() {
  return (
    <article className="full flex h-[122px] w-full bg-white px-[30px] pb-[23px] pt-[28px]">
      <div className="flex w-full flex-col gap-[24px]">
        <section className="flex items-center gap-[6px]">
          <img src={ActivitySvg} alt="Activity Icon" width={12} height={14} />
          <p className="text-[18px] font-bold leading-[140%] tracking-[-0.36px] text-[#2A2A2A]">
            활동
          </p>
        </section>
        <section className="flex w-full justify-between">
          <p className="text-[16px] font-[500] leading-[140%] text-[#595959]">
            뉴스픽
          </p>
          <img src={RightArrowSvg} alt="Right Arrow" width={14} height={12} />
        </section>
      </div>
    </article>
  );
}
