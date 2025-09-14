import { BookOpen, GraduationCap, Home, FolderOpen } from "lucide-react";

const navigationItems = [
    {
        name: "Home",
        href: "/dashboard",
        icon: Home,
    },
    {
        name: "Reading",
        href: "/dashboard/reading",
        icon: BookOpen,
    },
    {
        name: "Courses",
        href: "/dashboard/courses",
        icon: GraduationCap,
    },
    {
        name: "Projects",
        href: "/dashboard/projects",
        icon: FolderOpen,
    },
];

export default navigationItems;
