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

/* Custom tick that renders ® smaller */
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

export default function ComparisonChart({
  data,
  unit,
  formatValue = (v) => v.toFixed(2),
  yTicks,
  yDomain,
}: ComparisonChartProps) {
  const { ref, isVisible } = useScrollFadeIn();
  const isMobile = useIsMobile();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="deck-card-glass p-3 md:p-6 w-full h-[300px] md:h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={isMobile
            ? { top: 10, right: 5, left: 0, bottom: 90 }
            : { top: 20, right: 10, left: 10, bottom: 80 }
          }
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(0 0% 90%)" />
          <XAxis
            dataKey="name"
            tick={<CustomXTick isMobile={isMobile} />}
            interval={0}
            height={isMobile ? 110 : 100}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: isMobile ? 9 : 11, fill: "hsl(210 8% 35%)", dy: 1 }}
            axisLine={false}
            tickLine={false}
            ticks={yTicks}
            domain={yDomain}
            tickFormatter={(v) => `${v}`}
            width={isMobile ? 30 : 40}
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
          <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={isMobile ? 36 : 60} animationDuration={1500} animationEasing="ease-out">
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
      </ResponsiveContainer>
    </motion.div>
  );
}
