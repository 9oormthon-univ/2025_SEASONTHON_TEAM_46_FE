type CategoryPillProps = {
  label: "전체" | "정치" | "세계" | "IT" | "생활" | "사회";
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function CategoryPill({
  label,
  selected = false,
  onClick,
  className = "",
}: CategoryPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex select-none items-center justify-center text-center",
        "h-[38px] w-[63px] shrink-0 rounded-[50px]",
        "leading-[22.4px]",
        selected
          ? "bg-gradient-to-l from-[#7F81FF] to-[#3D57FE] font-semibold text-[#FAFAFA]"
          : "bg-[#FAFAFA] font-medium text-[#B3B3B3]",
        "transition-colors",
        className,
      ].join(" ")}
    >
      {label}
    </button>
  );
}
