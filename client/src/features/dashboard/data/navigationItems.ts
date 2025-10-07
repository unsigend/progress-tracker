// import icons
import { BookOpen, GraduationCap, Home, FolderOpen } from "lucide-react";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const navigationItems = [
    {
        name: "Home",
        href: ROUTES_CONSTANTS.DASHBOARD().HOME(),
        icon: Home,
    },
    {
        name: "Reading",
        href: ROUTES_CONSTANTS.DASHBOARD().READING().HOME(),
        icon: BookOpen,
    },
    {
        name: "Courses",
        href: ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME(),
        icon: GraduationCap,
    },
    {
        name: "Projects",
        href: ROUTES_CONSTANTS.DASHBOARD().PROJECTS().HOME(),
        icon: FolderOpen,
    },
];

export default navigationItems;
