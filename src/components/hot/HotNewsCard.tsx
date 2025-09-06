import { Category } from "../common/Category";

type HotNewsCardProps = {
  rank?: number;
  title: string;
  desc: string;
  categories: { text: string; color: string; bgColor: string }[];
  thumbnail: string;
  className?: string;
};

export default function HotNewsCard({
  rank,
  title,
  desc,
  categories,
  thumbnail,
  className = "",
}: HotNewsCardProps) {
  const hasRank = typeof rank === "number";
  const gridClass = hasRank
    ? "grid grid-cols-[auto_1fr] gap-x-[25px]"
    : "grid grid-cols-1";
  const colForCats = hasRank ? "col-start-2" : "col-start-1";
  const colForBody = hasRank ? "col-start-2" : "col-start-1";

  return (
    <div className={`w-[329px] ${className}`}>
      <div className="flex gap-[21px]">
        <div className={`min-w-0 flex-1 ${gridClass}`}>
          <div className={`${colForCats} row-start-1 mb-[10px] flex gap-[3px]`}>
            {categories.map((c, i) => (
              <Category
                key={`${c.text}-${i}`}
                text={c.text}
                textColor={c.color}
                bgColor={c.bgColor}
              />
            ))}
          </div>

          {hasRank && (
            <span className="col-start-1 row-start-2 pt-[2px] text-[20px] font-bold leading-none text-[#3D7EFF]">
              {rank as number}
            </span>
          )}

          <div className={`${colForBody} row-start-2 min-w-0`}>
            <h3 className="w-[191px] overflow-hidden text-[16px] font-semibold leading-[140%] tracking-[-0.48px] text-[#2A2A2A] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]">
              {title}
            </h3>
            <p
              className="mt-[6px] w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-medium leading-[16.8px] text-[#B3B3B3] [font-feature-settings:'liga'_off,'clig'_off] [letter-spacing:-0.24px]"
              title={desc}
            >
              {desc}
            </p>
          </div>
        </div>

        <div
          className="h-[82px] w-[82px] shrink-0 self-center rounded-[10px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      </div>
    </div>
  );
}
