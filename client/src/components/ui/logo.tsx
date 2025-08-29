const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            {/* Progress indicator icon */}
            <div className="w-8 h-8 relative">
                <div className="w-full h-full rounded-full border-2 border-gray-300"></div>
                <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-2 
                border-black border-t-transparent transform rotate-45"
                ></div>
            </div>
            {/* Logo text */}
            <div className="flex items-baseline">
                <span className="text-2xl font-bold text-black">Progress</span>
                <span className="text-2xl font-light text-gray-600 ml-0.5">
                    Tracker
                </span>
            </div>
        </div>
    );
};

export default Logo;
