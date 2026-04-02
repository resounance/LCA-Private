import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { motion } from "framer-motion";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChartDataItem {
  name: string;
  value: number;
  isHighlight?: boolean;
}

interface ComparisonChartProps {
  data: ChartDataItem[];
  unit: string;
  formatValue?: (v: number) => string;
  yTicks?: number[];
  yDomain?: [number, number];
}

/* Custom tick that renders ® smaller (desktop only) */
function CustomXTick(props: any) {
  const { x, y, payload, isMobile } = props;
  const text = payload.value as string;
  const fontSize = isMobile ? 9 : 11;
  const regSize = isMobile ? 5 : 7;

  if (!text.includes("®")) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0} y={0} dy={12}
          textAnchor="end"
          fill="hsl(210 8% 35%)"
          fontSize={fontSize}
          transform="rotate(-35)"
        >
          {text}
        </text>
      </g>
    );
  }
  const parts = text.split("®");
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0} y={0} dy={12}
        textAnchor="end"
        fill="hsl(210 8% 35%)"
        fontSize={fontSize}
        transform="rotate(-35)"
      >
        {parts[0]}<tspan fontSize={regSize} dy={-4}>®</tspan><tspan dy={4}>{parts[1]}</tspan>
      </text>
    </g>
  );
}

/* Helper: wrap text into lines of ~maxChars */
function wrapText(text: string, maxChars = 18): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (current && (current + " " + word).length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/* Custom Y-axis tick for mobile horizontal layout — renders multi-line + ® smaller */
function MobileYTick(props: any) {
  const { x, y, payload } = props;
  const text = payload.value as string;
  const fontSize = 10;
  const regSize = 6;
  const lineHeight = 12;

  const lines = wrapText(text, 18);
  const totalHeight = (lines.length - 1) * lineHeight;
  const startDy = 4 - totalHeight / 2;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-4} y={0} textAnchor="end" fill="hsl(210 8% 35%)" fontSize={fontSize}>
        {lines.map((line, i) => {
          const dy = i === 0 ? startDy : lineHeight;
          if (!line.includes("®")) {
            return <tspan x={-4} dy={dy} key={i}>{line}</tspan>;
          }
          const parts = line.split("®");
          return (
            <tspan x={-4} dy={dy} key={i}>
              {parts[0]}<tspan fontSize={regSize} dy={-3}>®</tspan><tspan dy={3}>{parts[1]}</tspan>
            </tspan>
          );
        })}
      </text>
    </g>
  );
}

export default function ComparisonChart({
  data,
  unit,
  formatValue = (v) => v.toFixed(2),
  yTicks,
  yDomain,
}: ComparisonChartProps) {
  const { ref, isVisible } = useScrollFadeIn();
  const isMobile = useIsMobile();

  const mobileHeight = Math.max(280, data.length * 62);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="deck-card-glass p-3 md:p-6 w-full"
      style={{ height: isMobile ? mobileHeight : 400 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {isMobile ? (
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 105, left: 10, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(0 0% 90%)" />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tick={<MobileYTick />}
              width={105}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28} animationDuration={1500} animationEasing="ease-out">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isHighlight ? "hsl(270 14% 56%)" : "hsl(270 14% 56% / 0.2)"}
                  stroke={entry.isHighlight ? "hsl(270 14% 46%)" : "transparent"}
                  strokeWidth={entry.isHighlight ? 1 : 0}
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: number) => `${formatValue(v)} ${unit}`}
                style={{ fontSize: 9, fill: "hsl(210 8% 35%)", fontFamily: "Nexa, system-ui" }}
              />
            </Bar>
          </BarChart>
        ) : (
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 80 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(0 0% 90%)" />
            <XAxis
              dataKey="name"
              tick={<CustomXTick isMobile={false} />}
              interval={0}
              height={100}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(210 8% 35%)", dy: 1 }}
              axisLine={false}
              tickLine={false}
              ticks={yTicks}
              domain={yDomain}
              tickFormatter={(v) => `${v}`}
              width={40}
            />
            <Tooltip
              formatter={(value: number) => [formatValue(value) + " " + unit]}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(270 14% 56% / 0.3)",
                boxShadow: "0 8px 30px -10px rgba(148, 126, 158, 0.2)",
                fontSize: "13px",
                fontFamily: "Nexa, system-ui",
                background: "hsl(0 0% 100% / 0.95)",
                backdropFilter: "blur(8px)",
              }}
              cursor={{ fill: "hsl(270 14% 56% / 0.1)" }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={60} animationDuration={1500} animationEasing="ease-out">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isHighlight ? "hsl(270 14% 56%)" : "hsl(270 14% 56% / 0.2)"}
                  stroke={entry.isHighlight ? "hsl(270 14% 46%)" : "transparent"}
                  strokeWidth={entry.isHighlight ? 1 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
}
