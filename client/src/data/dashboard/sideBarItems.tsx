import { Home, BookOpen, GraduationCap } from "lucide-react";

const menuItems = [
    {
        label: "Home",
        icon: Home,
        path: "/dashboard",
    },
    {
        label: "Reading Progress",
        icon: BookOpen,
        path: "/dashboard/reading",
    },
    {
        label: "Course Progress",
        icon: GraduationCap,
        path: "/dashboard/course",
    },
];

export default menuItems;
