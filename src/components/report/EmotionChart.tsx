export type Segment = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  segments: Segment[];
  width?: number;
  strokeWidth?: number;
  gap?: number;
  className?: string;
  onSegmentClick?: (label: string) => void;
};

export default function EmotionChart({
  segments,
  width = 320,
  strokeWidth = 18,
  gap = 6,
  className = "",
  onSegmentClick,
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

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      {/* 트랙 */}
      <path
        d={d}
        fill="none"
        stroke="#EDEDED"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* 세그먼트 */}
      {segments.map((seg, i) => {
        const len = (seg.value / totalValue) * usable;
        const offset = acc;
        acc += len + (i < segments.length - 1 ? gapPct : 0);

        return (
          <g key={seg.label + i}>
            {/* 실제 보이는 스트로크 */}
            <path
              d={d}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              pathLength={pathLength}
              style={{
                strokeDasharray: `${len} ${pathLength}`,
                strokeDashoffset: -offset,
                transition: "opacity .15s ease",
              }}
            />
            {/* 클릭 히트존(두껍고 투명) */}
            <path
              d={d}
              fill="none"
              stroke="transparent"
              strokeWidth={strokeWidth + 16}
              pathLength={pathLength}
              style={{
                strokeDasharray: `${len} ${pathLength}`,
                strokeDashoffset: -offset,
                cursor: onSegmentClick ? "pointer" : "default",
              }}
              onClick={() => onSegmentClick?.(seg.label)}
            >
              <title>{seg.label}</title>
            </path>
          </g>
        );
      })}
    </svg>
  );
}
