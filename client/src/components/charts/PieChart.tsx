// import components
import { Pie, PieChart } from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { useTheme } from "@/hooks/use-theme";

/**
 * Chart data interface
 * @typedef {Object} ChartDataItem
 * @property {string} key - Display name/label for the segment
 * @property {number} value - Numeric value for the segment size
 * @property {string} fill - Optional color for the segment (auto-generated if not provided)
 */
interface ChartDataItem {
    key: string;
    value: number;
    fill?: string;
}

/**
 * Pie Chart Component Props
 * @typedef {Object} PieChartProps
 * @property {ChartDataItem[]} data - Array of chart data items
 * @property {string} className - Chart container class name
 * @property {boolean} showTooltip - Show tooltip on hover @default true
 * @property {number} innerRadius - Inner radius for donut chart @default 60
 * @property {number} outerRadius - Outer radius @default 80
 * @property {boolean} showLegend - Show legend at the bottom of the chart @default false
 */
interface PieChartProps {
    data: ChartDataItem[];
    className?: string;
    showTooltip?: boolean;
    innerRadius?: number;
    outerRadius?: number;
    showLegend?: boolean;
}

/**
 * Generate theme-aware colors for chart segments
 */
const generateThemeColors = (dataLength: number, theme: string | undefined) => {
    // Check if we're in dark mode by looking at the document class
    const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        theme === "dark" ||
        (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDarkMode) {
        // Dark theme colors - natural, harmonious light colors
        const colors = [
            "#f8fafc", // Slate-50 (soft white)
            "#e2e8f0", // Slate-200 (warm light gray)
            "#cbd5e1", // Slate-300 (cool light gray)
            "#94a3b8", // Slate-400 (medium gray)
            "#64748b", // Slate-500 (darker gray)
            "#475569", // Slate-600 (dark gray)
            "#334155", // Slate-700 (very dark gray)
            "#1e293b", // Slate-800 (almost black)
            "#0f172a", // Slate-900 (deep dark)
            "#1e40af", // Blue-700 (deep blue accent)
        ];
        return colors.slice(0, dataLength);
    } else {
        // Light theme colors - natural, harmonious dark colors
        const colors = [
            "#0f172a", // Slate-900 (deep dark)
            "#1e293b", // Slate-800 (dark gray)
            "#334155", // Slate-700 (medium dark)
            "#475569", // Slate-600 (lighter dark)
            "#64748b", // Slate-500 (medium gray)
            "#94a3b8", // Slate-400 (light gray)
            "#cbd5e1", // Slate-300 (very light gray)
            "#e2e8f0", // Slate-200 (pale gray)
            "#f1f5f9", // Slate-100 (very pale)
            "#3b82f6", // Blue-500 (blue accent)
        ];
        return colors.slice(0, dataLength);
    }
};

/**
 * PieChart Component based on shadcn/ui
 */
const PieChartComponent = ({
    data,
    className = "mx-auto aspect-square max-h-[250px]",
    showTooltip = true,
    innerRadius = 60,
    outerRadius = 80,
    showLegend = false,
}: PieChartProps) => {
    const { theme } = useTheme();

    // Process data to ensure all items have fill colors
    const processedData = data.map((item, index) => ({
        ...item,
        fill: item.fill || generateThemeColors(data.length, theme)[index],
    }));

    // Create chart config for shadcn/ui
    const chartConfig: ChartConfig = {
        value: {
            label: "Value",
        },
        ...processedData.reduce((config, item) => {
            config[item.key.toLowerCase().replace(/\s+/g, "")] = {
                label: item.key,
                color: item.fill,
            };
            return config;
        }, {} as Record<string, unknown>),
    } satisfies ChartConfig;

    return (
        <ChartContainer config={chartConfig} className={className}>
            <PieChart>
                {/* Tooltip when hovering over the chart */}
                {showTooltip && (
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                )}

                {/* Pie chart */}
                <Pie
                    data={processedData}
                    dataKey="value"
                    nameKey="key"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    strokeWidth={2}
                    className="outline-none focus:outline-none"
                />

                {/* Legend under the chart */}
                {showLegend && (
                    <ChartLegend
                        content={<ChartLegendContent nameKey="key" />}
                        className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-md"
                    />
                )}
            </PieChart>
        </ChartContainer>
    );
};

export default PieChartComponent;
