/* eslint-disable @typescript-eslint/no-explicit-any */
import BarChartComponent from "@/components/charts/BarChart";
import LineChartComponent from "@/components/charts/LineChart";
import PieChartComponent from "@/components/charts/PieChart";

import random from "@/lib/utils/random";

const graphData = [
    {
        title: "Track Your course progress",
        incremental1: "Time Spent",
        incremental2: "21.7h",
        chartData: [
            { key: "lecture", value: 300 },
            { key: "lab", value: 380 },
            { key: "notes", value: 200 },
            { key: "project", value: 420 },
        ],
        component: ({ chartData }: { chartData: any }) => (
            <PieChartComponent
                data={chartData}
                showLegend={true}
                innerRadius={45}
            />
        ),
    },
    {
        title: "Record your reading progress",
        incremental1: "+160 pages",
        incremental2: "+28% from last week",
        chartData: Array.from({ length: 8 }, () => ({
            value: random.number(10, 100),
        })),
        component: ({ chartData }: { chartData: any }) => (
            <LineChartComponent chartData={chartData} />
        ),
    },
    {
        title: "Track your project progress",
        incremental1: "+58 commits",
        incremental2: "+12% from last month",
        chartData: [
            { key: "October", value: 300 },
            { key: "November", value: 380 },
            { key: "December", value: 200 },
            { key: "January", value: 420 },
            { key: "February", value: 220 },
            { key: "March", value: 529 },
        ],
        component: ({ chartData }: { chartData: any }) => (
            <BarChartComponent
                chartData={chartData}
                color="rgb(56, 65, 81)"
                label="Commits"
            />
        ),
    },
];

export default graphData;
