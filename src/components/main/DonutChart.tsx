interface DonutChartProps {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
}

export function DonutChart({
  size = 100,
  strokeWidth = 10,
  progress,
  color = "url(#gradient)",
  trackColor = "#E5E7EB",
  children,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 1.99;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const angle = (progress / 100) * 360 - 90; // -90도: 시작점 보정
  const rad = (angle * Math.PI) / 180;
  const x = size / 2 + radius * Math.cos(rad);
  const y = size / 2 + radius * Math.sin(rad);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="absolute z-[20]">
        <defs>
          <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7F81FF" />
            <stop offset="100%" stopColor="#3D57FE" />
          </linearGradient>
        </defs>
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <svg
        width={15}
        height={16}
        style={{
          position: "absolute",
          left: x - 7.5,
          top: y - 8,
          zIndex: 30,
          pointerEvents: "none",
        }}
      >
        <circle
          cx="7.5"
          cy="7.7406"
          r="4"
          fill="white"
          stroke="#3D57FE"
          strokeWidth="7"
        />
      </svg>
      <div className="absolute left-[2px] top-[12px] z-[0] flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full">
        {children}
      </div>
    </div>
  );
}
