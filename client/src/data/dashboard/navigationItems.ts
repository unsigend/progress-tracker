// import icons
import { BookOpen, GraduationCap, Home, FolderOpen } from "lucide-react";

// import constants
import ROUTES from "@/constants/routes";

const navigationItems = [
    {
        name: "Home",
        href: ROUTES.DASHBOARD_HOME,
        icon: Home,
    },
    {
        name: "Reading",
        href: ROUTES.READING_HOME,
        icon: BookOpen,
    },
    {
        name: "Courses",
        href: ROUTES.COURSES_HOME,
        icon: GraduationCap,
    },
    {
        name: "Projects",
        href: ROUTES.PROJECTS_HOME,
        icon: FolderOpen,
    },
];

export default navigationItems;
