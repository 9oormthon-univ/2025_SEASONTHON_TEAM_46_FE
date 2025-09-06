import type { Segment } from "./EmotionChart";

type Props = {
  segments: Segment[];
  label: string;
  width: number;
  strokeWidth: number;
  gap: number;
  className?: string;
};

export default function EmotionHighlight({
  segments,
  label,
  width,
  strokeWidth,
  gap,
  className = "",
}: Props) {
  const r = (width - strokeWidth) / 2;
  const height = r + strokeWidth;
  const cx = width / 2;
  const cy = r + strokeWidth / 2;
  const d = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  const pathLength = 100;
  const totalValue = Math.max(
    0.0001,
    segments.reduce((s, v) => s + v.value, 0),
  );

  const semiCircumference = Math.PI * r;
  const gapPct = (gap / semiCircumference) * pathLength;
  const usable = pathLength - gapPct * (segments.length - 1);

  let acc = 0;
  const target = segments.find((s) => s.label === label);
  if (!target) return null;

  let len = 0;
  let offset = 0;
  for (let i = 0; i < segments.length; i++) {
    const s = segments[i];
    const l = (s.value / totalValue) * usable;
    if (s === target) {
      len = l;
      offset = acc;
      break;
    }
    acc += l + (i < segments.length - 1 ? gapPct : 0);
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      {/* 선택 세그먼트만 표시 (약한 글로우 옵션) */}
      <path
        d={d}
        fill="none"
        stroke={target.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={pathLength}
        style={{
          strokeDasharray: `${len} ${pathLength}`,
          strokeDashoffset: -offset,
          filter: `drop-shadow(0 0 8px ${target.color})`,
        }}
      />
    </svg>
  );
}
