import React from "react";

interface BooksWeLoveProps {
    coverImageUrls: string[];
    title?: string;
    subtitle?: string;
    className?: string;
}

const BooksWeLove: React.FC<BooksWeLoveProps> = ({
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
                        className="w-auto rounded-md shadow-[0_4px_6px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.3),0_20px_40px_rgba(0,0,0,0.4)]
                                   h-[200px] sm:h-[280px] md:h-[300px] lg:h-[340px]"
                    />
                </div>
            );
        });
    };

    return (
        <div className={className}>
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 sm:mb-10 lg:mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                    {title}
                </h1>
                <p className="text-base sm:text-lg text-white/70">{subtitle}</p>
            </div>

            {/* Books Display */}
            <div className="max-w-7xl mx-auto relative h-[220px] sm:h-[300px] md:h-[340px] lg:h-[400px] flex justify-center items-end">
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

export default BooksWeLove;
