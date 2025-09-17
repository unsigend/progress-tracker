// import icons
import { BookOpen, GraduationCap, Home, FolderOpen } from "lucide-react";

// import constants
import ROUTES from "@/constants/routes";

const navigationItems = [
    {
        name: "Home",
        href: ROUTES.DASHBOARD,
        icon: Home,
    },
    {
        name: "Reading",
        href: ROUTES.READING,
        icon: BookOpen,
    },
    {
        name: "Courses",
        href: ROUTES.COURSES,
        icon: GraduationCap,
    },
    {
        name: "Projects",
        href: ROUTES.PROJECTS,
        icon: FolderOpen,
    },
];

export default navigationItems;
