/**
 * Welcome Card Component automatically changes the month
 * @returns Welcome Card
 */
const WelcomeMonthCard = () => {
    const today = new Date();
    const monthIndex = today.getMonth();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const monthName = months[monthIndex];
    const monthNumber = String(monthIndex + 1).padStart(2, "0");

    return (
        <div className="h-full flex flex-col space-y-4">
            {/* Header Section */}
            <div className="space-y-2 flex-shrink-0">
                <p className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    New
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                    Check out the progress this month.
                </h2>
            </div>

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-400 via-red-300 to-red-200 dark:from-red-950 dark:via-red-900 dark:to-red-800 p-8 lg:p-12 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 ease-out hover:-translate-y-1 flex-1 flex items-center">
                {/* Large Background Number */}
                <div className="absolute -top-4 right-4 lg:-top-6 lg:right-6">
                    <span className="text-[120px] lg:text-[160px] font-extrabold text-white/25 dark:text-pink-300/25 select-none leading-none tracking-tighter opacity-80 animate-pulse hover:opacity-100 transition-opacity duration-700">
                        {monthNumber}
                    </span>
                </div>

                {/* Card Content */}
                <div className="relative z-10 flex items-center justify-center w-full">
                    <div className="text-3xl lg:text-4xl font-semibold text-white dark:text-blue-300 leading-tight text-center">
                        <div>New in</div>
                        <div>{monthName}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeMonthCard;
