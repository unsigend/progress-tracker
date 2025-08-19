/**
 * MIT License
 *
 * Copyright (c) 2025 Qiu Yixiang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
