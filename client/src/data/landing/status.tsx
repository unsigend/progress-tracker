import { BarChart3, BookOpen, NotebookText, GitBranch } from "lucide-react";
import {
    MiniBarChart,
    MiniLineChart,
    MiniPieChart,
} from "@/components/miniChart";

const stats = [
    {
        label: "Projects Completed",
        value: "7",
        icon: <BarChart3 className="w-4 h-4 text-gray-700" />,
        change: "+18%",
        chart: <MiniBarChart data={[60, 80, 40, 90, 70, 100, 85]} />,
    },
    {
        label: "Reading Progress",
        value: "78%",
        icon: <BookOpen className="w-4 h-4 text-gray-700" />,
        change: "+12%",
        chart: <MiniLineChart />,
    },
    {
        label: "Course Progress",
        value: "68%",
        icon: <NotebookText className="w-4 h-4 text-gray-700" />,
        change: "+25%",
        chart: <MiniPieChart percentage={68} />,
    },
    {
        label: "Contributions",
        value: "89",
        icon: <GitBranch className="w-4 h-4 text-gray-700" />,
        change: "+8%",
        chart: <MiniBarChart data={[30, 50, 40, 70, 60, 80, 89]} />,
    },
];

export default stats;
