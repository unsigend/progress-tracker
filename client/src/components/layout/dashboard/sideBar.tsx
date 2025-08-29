// import dependencies
import { Link, useLocation } from "react-router";

// import data
import menuItems from "@/data/dashboard/sideBarItems";

const SideBar = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 py-4">
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center">
                    <Link to="/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                            <div className="w-4 h-4 bg-black rounded-sm transform rotate-45"></div>
                        </div>
                        <span className="text-lg font-bold text-white">
                            Progress Tracker
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="-mx-2 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors ${
                                            isActive(item.path)
                                                ? "bg-white text-black"
                                                : "text-gray-300 hover:text-white hover:bg-gray-800"
                                        }`}
                                    >
                                        <Icon
                                            className={`h-5 w-5 shrink-0 ${
                                                isActive(item.path)
                                                    ? "text-black"
                                                    : "text-gray-400 group-hover:text-white"
                                            }`}
                                        />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
