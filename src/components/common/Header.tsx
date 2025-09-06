import BackArrow from "../../assets/icons/back_arrow.svg";
import LeftCaret from "../../assets/icons/left-caret.svg";
import RightCaret from "../../assets/icons/right-caret.svg";
type CommonHeaderProps = {
  title: string;
  onBack?: () => void;
  showBackIcon?: boolean;
  className?: string;
  showTitleArrows?: boolean;
  onTitleLeft?: () => void;
  onTitleRight?: () => void;
};

export default function CommonHeader({
  title,
  onBack,
  showBackIcon,
  className = "",
  showTitleArrows = false,
  onTitleLeft,
  onTitleRight,
}: CommonHeaderProps) {
  const shouldShowBack = showBackIcon ?? Boolean(onBack);

  return (
    <header
      className={`relative h-[95px] w-full shrink-0 overflow-hidden rounded-b-[20px] bg-white px-7 ${className}`}
    >
      {shouldShowBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className="absolute bottom-[25px] left-[29px] inline-flex items-end justify-center text-[#2A2A2A] disabled:opacity-40"
        >
          <img src={BackArrow} alt="뒤로가기" />
        </button>
      )}
      <div className="absolute bottom-[21px] left-1/2 -translate-x-1/2">
        {showTitleArrows ? (
          <div className="inline-flex items-center gap-[15px] whitespace-nowrap break-keep">
            <button
              type="button"
              onClick={onTitleLeft}
              disabled={!onTitleLeft}
              className="inline-flex h-5 w-5 items-center justify-center disabled:opacity-40"
              aria-label="이전"
              title="이전"
            >
              <img src={LeftCaret} alt="" className="h-5 w-5" />
            </button>

            <h1 className="text-lg font-bold leading-[25.2px] text-[#2A2A2A]">
              {title}
            </h1>

            <button
              type="button"
              onClick={onTitleRight}
              disabled={!onTitleRight}
              className="inline-flex h-5 w-5 items-center justify-center disabled:opacity-40"
              aria-label="다음"
              title="다음"
            >
              <img src={RightCaret} alt="" className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <h1 className="text-lg font-bold leading-[25.2px] text-[#2A2A2A]">
            {title}
          </h1>
        )}
      </div>
    </header>
  );
}
