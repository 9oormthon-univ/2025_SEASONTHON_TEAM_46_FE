import { Category } from "../common/Category";

type Props = {
  positive?: number;
  negative?: number;
  neutral?: number;
  className?: string;
};

export default function NewsSentimentBar({
  positive = 15,
  negative = 22,
  neutral = 5,
  className = "",
}: Props) {
  return (
    <div
      className={`h-20 w-[337px] flex-shrink-0 rounded-[10px] bg-[#FAFAFA] px-[33px] ${className}`}
    >
      <div className="flex h-full items-center justify-between">
        <SentimentCell label="긍정" value={positive} color="#7BEAD7" />
        <Divider />
        <SentimentCell label="부정" value={negative} color="#FF7676" />
        <Divider />
        <SentimentCell label="중립" value={neutral} color="#F2F2F2" />
      </div>
    </div>
  );
}

function Divider() {
  return (
    <span
      className="h-[23px] w-[2px] self-center rounded bg-[#D9D9D9]"
      aria-hidden
    />
  );
}

function SentimentCell({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Category text={label} color={color} />
      <p className="text-xl font-bold text-[#595959]">{value}</p>
    </div>
  );
}
