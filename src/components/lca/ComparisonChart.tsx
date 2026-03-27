import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

interface ChartDataItem {
  name: string;
  value: number;
  isHighlight?: boolean;
}

interface ComparisonChartProps {
  data: ChartDataItem[];
  highlightColor: string;
  baseColor: string;
  unit: string;
  formatValue?: (v: number) => string;
}

export default function ComparisonChart({
  data,
  highlightColor,
  baseColor,
  unit,
  formatValue = (v) => v.toFixed(2),
}: ComparisonChartProps) {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <div
      ref={ref}
      className={`deck-card-glass p-4 md:p-6 w-full h-[350px] md:h-[400px] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 60 }} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(0 0% 90%)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "hsl(210 8% 35%)" }}
            angle={-35}
            textAnchor="end"
            interval={0}
            height={80}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(210 8% 35%)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip
            formatter={(value: number) => [`${formatValue(value)} ${unit}`, ""]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid hsl(0 0% 90%)",
              boxShadow: "0 8px 30px -10px rgba(0,0,0,0.1)",
              fontSize: "13px",
              fontFamily: "Nexa, system-ui",
            }}
            cursor={{ fill: "hsl(0 0% 96% / 0.5)" }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={60}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isHighlight ? highlightColor : baseColor}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
