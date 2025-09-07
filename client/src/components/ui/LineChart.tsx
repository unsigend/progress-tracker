import { LineChart, Line, ResponsiveContainer } from "recharts";

/**
 * Chart Data Type
 * @typedef {Object} ChartData
 * @property {number} value - The value of the chart
 */
type ChartData = {
    value: number;
};

/**
 * Line Chart Component
 * @param {ChartData[]} chartData - The data for the chart
 * @returns
 */
function LineChartComponent({ chartData }: { chartData: ChartData[] }) {
    return (
        <div className="h-48 -mx-2 flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#374151"
                        strokeWidth={3}
                        dot={false}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChartComponent;
