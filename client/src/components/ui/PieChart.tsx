import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
 * Pie Chart Component
 * @param {ChartData[]} chartData - The data for the chart
 * @returns
 */
function PieChartComponent({ chartData }: { chartData: ChartData[] }) {
    // Generate grayscale colors for each segment
    const generateColors = (dataLength: number) => {
        const baseColors = [
            "#1f2937", // gray-800 (darkest)
            "#374151", // gray-700
            "#4b5563", // gray-600
            "#6b7280", // gray-500
            "#9ca3af", // gray-400
            "#d1d5db", // gray-300 (lightest)
        ];

        // Repeat colors if we have more data points than colors
        return Array.from(
            { length: dataLength },
            (_, index) => baseColors[index % baseColors.length]
        );
    };

    const colors = generateColors(chartData.length);

    // Add names to data if not provided
    const processedData = chartData.map((item, index) => ({
        ...item,
        name: item.name || `Segment ${index + 1}`,
    }));

    return (
        <div className="h-48 -mx-2 flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={processedData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                    >
                        {processedData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index]}
                                className="transition-all duration-200 hover:opacity-80"
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PieChartComponent;
