import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import type { LabelProps } from "recharts";

type Item = { name: string; value: number };
type SimpleViewBox = {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
};
type LabelPropsWithViewBox = LabelProps & { viewBox?: SimpleViewBox };
type GridGenArg = {
  yAxis?: {
    scale?: (v: number) => number | string;
  };
};
const data: Item[] = [
  { name: "정치", value: 8 },
  { name: "세계", value: 48 },
  { name: "IT", value: 30 },
  { name: "생활", value: 12 },
  { name: "사회", value: 81 },
];

export default function CategoryCharts() {
  const max = Math.max(...data.map((d) => d.value));

  const renderMaxLabel = (props: LabelPropsWithViewBox) => {
    const { value, index, viewBox } = props;
    if (typeof index !== "number" || !viewBox) return null;
    if (data[index].value !== max) return null;

    const vx = Number(viewBox.x ?? 0);
    const vy = Number(viewBox.y ?? 0);
    const vw = Number(viewBox.width ?? 0);

    const cx = vx + vw / 2;
    const ty = vy - 5;

    return (
      <text
        x={cx}
        y={ty}
        textAnchor="middle"
        fill="#3D57FE"
        fontSize={13}
        fontWeight={700}
      >
        {`${value}%`}
      </text>
    );
  };
  const genGridLines = (p: GridGenArg) => {
    const s = p.yAxis?.scale;
    if (!s) return [];
    const toNum = (val: number | string) =>
      typeof val === "number" ? val : Number(val);
    return [0, 20, 40, 60, 80].map((t) => toNum(s(t)));
  };

  return (
    <div className="w-full">
      <div className="flex w-[393px] flex-col items-center gap-4">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {/* 막대 */}
            <BarChart
              data={data}
              barSize={20}
              barCategoryGap={24}
              margin={{ top: 10, right: 44, left: 0, bottom: 20 }}
            >
              {/* 점선 */}
              <CartesianGrid
                vertical={false}
                stroke="#E6E6E6"
                strokeDasharray="6 6"
                horizontalCoordinatesGenerator={genGridLines}
              />

              {/* 라벨 */}
              <XAxis
                dataKey="name"
                tick={{ fill: "#7F81FF", fontSize: 14, fontWeight: 700 }}
                axisLine={{ stroke: "#7F81FF" }}
                tickLine={false}
              />
              {/* 오른쪽 축 */}
              <YAxis
                orientation="right"
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80]}
                tickFormatter={(v) => (v === 0 ? "" : `${v}%`)}
                tick={{ fill: "#BFBFBF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={36}
              />

              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3D57FE" />
                  <stop offset="100%" stopColor="#7F81FF" stopOpacity={0.35} />
                </linearGradient>
              </defs>

              <Bar
                dataKey="value"
                fill="url(#barGrad)"
                radius={[8, 8, 0, 0]}
                isAnimationActive={false}
              >
                <LabelList dataKey="value" content={renderMaxLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
