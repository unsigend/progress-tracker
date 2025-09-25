import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * Bar chart data interface
 * @typedef {Object} BarChartData
 * @property {string} key - The key of the bar
 * @property {number} value - The value of the bar
 */
interface BarChartData {
    key: string;
    value: number;
}

/**
 * Bar chart component
 * @param chartData: chart data
 * @param color: color of the bars
 * @param label: label of the chart when hovering over the bars
 * @returns Bar chart component
 */
const BarChartComponent = ({
    chartData,
    color,
    label,
}: {
    chartData: BarChartData[];
    color: string | undefined;
    label: string;
}) => {
    const chartConfig: ChartConfig = {
        value: {
            label: label,
        },
    } satisfies ChartConfig;

    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="key"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                    dataKey="value"
                    fill={color}
                    radius={8}
                    className="outline-none focus:outline-none"
                />
            </BarChart>
        </ChartContainer>
    );
};

export default BarChartComponent;
