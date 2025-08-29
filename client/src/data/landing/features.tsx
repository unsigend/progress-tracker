import {
    TrendingUp,
    BarChart3,
    Users,
    GitBranch,
    Smartphone,
    Zap,
} from "lucide-react";

const features = [
    {
        id: 1,
        title: "Smart Progress Tracking",
        text: "Track your reading progress, course completion, and project milestones with intuitive progress bars and milestone markers.",
        icon: <TrendingUp className="text-white" />,
    },
    {
        id: 2,
        title: "Data Visualization",
        text: "Visualize your learning journey with beautiful charts, graphs, and analytics to understand your progress patterns and achievements.",
        icon: <BarChart3 className="text-white" />,
    },
    {
        id: 3,
        title: "Community Driven",
        text: "Join a community of learners, share your progress, discover new learning resources, and motivate each other to achieve goals.",
        icon: <Users className="text-white" />,
    },
    {
        id: 4,
        title: "Open Source Contribution",
        text: "Built by the community, for the community. Contribute features, report bugs, or help improve the platform for everyone.",
        icon: <GitBranch className="text-white" />,
    },
    {
        id: 5,
        title: "Cross-Platform Support",
        text: "Access your progress tracker on any device - desktop, tablet, or mobile. Your data syncs seamlessly across all platforms.",
        icon: <Smartphone className="text-white" />,
    },
    {
        id: 6,
        title: "Real-Time Analytics",
        text: "Get instant insights into your learning habits, productivity patterns, and goal achievements with live data updates.",
        icon: <Zap className="text-white" />,
    },
];

export default features;
