import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
 * @param chartData: chart data
 * @returns Line chart component
 */
function LineChartComponent({ chartData }: { chartData: ChartData[] }) {
    const { theme, resolvedTheme } = useTheme();
    const [strokeColor, setStrokeColor] = useState("#000000");

    // Get theme-aware stroke color
    useEffect(() => {
        const currentTheme = resolvedTheme || theme;

        // Check if we're in dark mode by looking at the document class
        const isDarkMode =
            document.documentElement.classList.contains("dark") ||
            currentTheme === "dark" ||
            (currentTheme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        if (isDarkMode) {
            setStrokeColor("#ffffff"); // White for dark theme
        } else {
            setStrokeColor("#000000"); // Black for light theme
        }
    }, [theme, resolvedTheme]);

    return (
        <div className="h-48 -mx-2 flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={strokeColor}
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
