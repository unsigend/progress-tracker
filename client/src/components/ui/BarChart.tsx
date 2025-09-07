import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

/**
 * Chart Data Type
 * @typedef {Object} ChartData
 * @property {number} value - The value of the chart
 * @property {string} name - Optional name for the data point
 */
type ChartData = {
    value: number;
    name?: string;
};

/**
 * Bar Chart Component
 * @param {ChartData[]} chartData - The data for the chart
 * @returns
 */
function BarChartComponent({ chartData }: { chartData: ChartData[] }) {
    // Add names to data if not provided
    const processedData = chartData.map((item, index) => ({
        ...item,
        name: item.name || `Item ${index + 1}`,
    }));

    return (
        <div className="h-48 -mx-2 flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={processedData}
                    margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                >
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        hide
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        hide
                    />
                    <Bar
                        dataKey="value"
                        fill="#374151"
                        radius={[4, 4, 0, 0]}
                        className="transition-all duration-200 hover:opacity-80"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartComponent;
