type SummaryBarProps = {
  lines: string[];
  className?: string;
};

export default function SummaryBar({ lines, className = "" }: SummaryBarProps) {
  return (
    <div
      className={[
        "h-auto w-[337px] flex-shrink-0 rounded-[10px] bg-[#F9F9F9]",
        "px-[19px] pb-4 pt-[14px]",
        className,
      ].join(" ")}
    >
      <h3 className="text-[13px] font-bold leading-[18.2px] text-[#7F81FF]/90">
        띵키의 소비 분석
      </h3>

      <p className="mt-[8px] w-[289px] text-[14px] font-medium leading-[21px] text-[#B3B3B3] [letter-spacing:-0.42px]">
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}
