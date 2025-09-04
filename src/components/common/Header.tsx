import BackArrow from "../../assets/icons/back_arrow.svg";

type CommonHeaderProps = {
  title: string;
  onBack?: () => void;
  showBackIcon?: boolean;
  className?: string;
};

export default function CommonHeader({
  title,
  onBack,
  showBackIcon,
  className = "",
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

      <h1 className="absolute bottom-[21px] left-1/2 -translate-x-1/2 text-lg font-bold leading-[25.2px] text-[#2A2A2A]">
        {title}
      </h1>
    </header>
  );
}
