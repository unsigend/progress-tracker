import React from "react";

interface FeatureBarProps {
    icon: React.ReactNode;
    title: string;
    text: string;
}

const FeatureCard = ({ icon: Icon, title, text }: FeatureBarProps) => {
    return (
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4">
            {/* Icon Container */}
            <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center">
                    {Icon}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;
