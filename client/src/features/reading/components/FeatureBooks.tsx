// import dependencies
import { Link } from "react-router";
import React from "react";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import icons
import { ArrowRight } from "lucide-react";

interface FeatureBooksProps {
    coverImageUrls: string[];
    title?: string;
    subtitle?: string;
    className?: string;
}

const FeatureBooks: React.FC<FeatureBooksProps> = ({
    coverImageUrls,
    title = "Books We Love",
    subtitle = "Find your next favorite. See picks from the Apple Books team.",
    className = "",
}) => {
    const xl2DevicePositions = [
        { left: "3%", zIndex: 1, rotation: -8 },
        { left: "12%", zIndex: 2, rotation: -4 },
        { left: "22%", zIndex: 3, rotation: 2 },
        { left: "30%", zIndex: 4, rotation: -3 },
        { left: "38%", zIndex: 5, rotation: 5 },
        { left: "50%", zIndex: 6, rotation: -7 },
        { left: "60%", zIndex: 7, rotation: 3 },
        { left: "72%", zIndex: 8, rotation: -2 },
    ];

    const xlDevicePositions = [
        { left: "3%", zIndex: 1, rotation: -8 },
        { left: "10%", zIndex: 2, rotation: -4 },
        { left: "18%", zIndex: 3, rotation: 2 },
        { left: "27%", zIndex: 4, rotation: -3 },
        { left: "36%", zIndex: 5, rotation: 5 },
        { left: "45%", zIndex: 6, rotation: -6 },
    ];

    const lgDevicePositions = [
        { left: "3%", zIndex: 1, rotation: -6 },
        { left: "14%", zIndex: 2, rotation: 3 },
        { left: "29%", zIndex: 3, rotation: -2 },
        { left: "46%", zIndex: 4, rotation: -1 },
        { left: "63%", zIndex: 5, rotation: 8 },
    ];

    const mdDevicePositions = [
        { left: "3%", zIndex: 1, rotation: -6 },
        { left: "19%", zIndex: 2, rotation: 3 },
        { left: "37%", zIndex: 3, rotation: -2 },
        { left: "53%", zIndex: 4, rotation: 9 },
    ];

    const smDevicePositions = [
        { left: "12%", zIndex: 1, rotation: -8 },
        { left: "30%", zIndex: 2, rotation: 2 },
        { left: "50%", zIndex: 3, rotation: 6 },
    ];

    const renderBooks = (
        count: number,
        positions: typeof xl2DevicePositions
    ) => {
        return coverImageUrls.slice(0, count).map((url, index) => {
            const position = positions[index];

            return (
                <div
                    key={index}
                    className="absolute transition-all duration-300 cursor-pointer hover:-translate-y-4 hover:scale-105 hover:z-50"
                    style={{
                        left: position.left,
                        zIndex: position.zIndex,
                        transform: `rotate(${position.rotation}deg)`,
                    }}
                >
                    <img
                        src={url}
                        alt={`Book ${index + 1}`}
                        className="w-auto rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.3),0_16px_32px_rgba(0,0,0,0.4),0_24px_48px_rgba(0,0,0,0.5)]
                                   h-[150px] sm:h-[200px] md:h-[220px] lg:h-[260px]"
                        style={{
                            boxShadow: `
                                0 4px 8px rgba(0, 0, 0, 0.2),
                                0 12px 24px rgba(0, 0, 0, 0.3),
                                0 20px 40px rgba(0, 0, 0, 0.4),
                                -8px 0 16px rgba(0, 0, 0, 0.2)
                            `,
                        }}
                    />
                </div>
            );
        });
    };

    return (
        <div
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 via-gray-800 
            to-slate-700 dark:from-black dark:via-slate-900 dark:via-gray-900 dark:to-slate-800 p-4 sm:p-6 lg:p-8 xl:p-16 shadow-xl 
            hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-out ${className}`}
        >
            {/* Colorful radial gradient overlays for enhanced fading effects */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 25% 25%, rgba(147, 51, 234, 0.2) 0%, rgba(79, 172, 254, 0.15) 30%, rgba(56, 189, 248, 0.08) 60%, transparent 80%)",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 75% 75%, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.1) 40%, rgba(34, 197, 94, 0.05) 70%, transparent 85%)",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 10%, rgba(255, 255, 255, 0.1) 0%, rgba(147, 197, 253, 0.05) 50%, transparent 75%)",
                }}
            />
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-6 relative z-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                    {title}
                    <Link
                        to={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_LIST()}
                    >
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                    </Link>
                </h1>
                <p className="text-base sm:text-lg text-white/90">{subtitle}</p>
            </div>

            {/* Books Display */}
            <div className="max-w-7xl mx-auto relative h-[170px] sm:h-[220px] md:h-[240px] flex justify-center items-end z-10">
                {/* Small Devices */}
                <div className="sm:hidden w-full h-full relative">
                    {renderBooks(3, smDevicePositions)}
                </div>

                {/* Medium Devices */}
                <div className="hidden sm:block md:hidden w-full h-full relative">
                    {renderBooks(4, mdDevicePositions)}
                </div>

                {/* Large Devices */}
                <div className="hidden md:block lg:hidden w-full h-full relative">
                    {renderBooks(5, lgDevicePositions)}
                </div>

                {/* Extra Large Devices */}
                <div className="hidden lg:block xl:hidden w-full h-full relative">
                    {renderBooks(6, xlDevicePositions)}
                </div>

                {/* 2XL Devices */}
                <div className="hidden xl:block w-full h-full relative">
                    {renderBooks(8, xl2DevicePositions)}
                </div>
            </div>
        </div>
    );
};

export default FeatureBooks;
