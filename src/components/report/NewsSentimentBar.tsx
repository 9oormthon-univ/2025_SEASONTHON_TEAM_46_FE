import { Category } from "../common/Category";

type Props = {
  positive?: number;
  negative?: number;
  neutral?: number;
  className?: string;
};

export default function NewsSentimentBar({
  positive = 0,
  negative = 0,
  neutral = 0,
  className = "",
}: Props) {
  return (
    <div
      className={`h-20 w-[337px] flex-shrink-0 rounded-[10px] bg-[#FAFAFA] px-[33px] ${className}`}
    >
      <div className="flex h-full items-center justify-between">
        <SentimentCell
          label="긍정"
          value={positive}
          textColor="#38D1B8"
          bgColor="#E6FBF7"
        />
        <Divider />
        <SentimentCell
          label="부정"
          value={negative}
          textColor="#FF7676"
          bgColor="#FFE7E7"
        />
        <Divider />
        <SentimentCell
          label="중립"
          value={neutral}
          textColor="#9FA0A3"
          bgColor="#F2F2F2"
        />
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

type SentimentCellProps = {
  label: string;
  value?: number;
  textColor: string;
  bgColor?: string;
};

function SentimentCell({
  label,
  value = 0,
  textColor,
  bgColor,
}: SentimentCellProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Category
        text={label}
        textColor={textColor}
        bgColor={bgColor ?? "#EEF0FF"}
      />
      <p className="text-xl font-bold text-[#595959]">{value}</p>
    </div>
  );
}
