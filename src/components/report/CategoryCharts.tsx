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
type GridGenArg = { yAxis?: { scale?: (v: number) => number | string } };

type Props = {
  items: Item[]; // ReportPage에서 계산해서 내려줌
};

export default function CategoryCharts({ items }: Props) {
  const safeItems = Array.isArray(items) ? items : [];
  const max = safeItems.length ? Math.max(...safeItems.map((d) => d.value)) : 0;

  const renderMaxLabel = (props: LabelPropsWithViewBox) => {
    const { value, index, viewBox } = props;
    if (typeof index !== "number" || !viewBox) return null;
    if (!safeItems.length || safeItems[index].value !== max) return null;

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
      <div className="flex w-full flex-col items-center gap-4">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={safeItems}
              barSize={20}
              barCategoryGap={24}
              margin={{ top: 10, right: 44, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#E6E6E6"
                strokeDasharray="6 6"
                horizontalCoordinatesGenerator={genGridLines}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#7F81FF", fontSize: 14, fontWeight: 700 }}
                axisLine={{ stroke: "#7F81FF" }}
                tickLine={false}
              />
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
