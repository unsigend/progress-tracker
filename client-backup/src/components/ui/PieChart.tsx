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
 * Generate grayscale colors for chart segments
 */
const generateGrayscaleColors = (dataLength: number) => {
    const colors = [
        "#000000", // black
        "#374151", // gray-700
        "#6b7280", // gray-500
        "#9ca3af", // gray-400
        "#d1d5db", // gray-300
        "#f3f4f6", // gray-100
    ];
    return colors.slice(0, dataLength);
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
    // Process data to ensure all items have fill colors
    const processedData = data.map((item, index) => ({
        ...item,
        fill: item.fill || generateGrayscaleColors(data.length)[index],
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
