/**
 * Date utility functions
 */
const dateUtils = {
    /**
     * Format a date string to a readable date
     * @param dateString - The date string to format
     * @returns The formatted date
     */
    formatDate: (dateString: string) => {
        if (!dateString) return "Not available";

        const datePart = dateString.split("T")[0];
        const [year, month, day] = datePart.split("-");
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        return dateObj.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    },

    /**
     * Get day name from date
     * @param date - The date object
     * @returns The abbreviated day name
     */
    getDayName: (date: Date) => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
    },

    /**
     * Format week date range
     * @param weekStartDate - The start date of the week (YYYY-MM-DD format)
     * @returns Formatted week range string (e.g., "Oct 1 - Oct 7")
     */
    formatWeekRange: (weekStartDate: string) => {
        // Parse date in local timezone to avoid UTC issues
        const [year, month, day] = weekStartDate.split("-").map(Number);
        const startDate = new Date(year, month - 1, day);
        const endDate = new Date(year, month - 1, day + 6);

        const formatDate = (date: Date) => {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        };

        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    },

    /**
     * Get week start date based on offset
     * @param weekOffset - Week offset (0 = current week, negative = past weeks)
     * @returns Week start date in YYYY-MM-DD format
     */
    getWeekStartDate: (weekOffset: number = 0): string => {
        const today = new Date();
        // index start from 0 is Sunday
        const currentDay = today.getDay();
        // Convert to Monday-based week (Monday = 0, Sunday = 6)
        const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;

        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - daysToMonday + weekOffset * 7);
        return weekStart.toISOString().split("T")[0];
    },

    /**
     * Create week data structure for charts
     * @param recordings - Array of recordings with date and pages
     * @param weekStartDate - Start date of the week
     * @returns Array of day data for the week
     */
    createWeekData: (
        recordings: { date: string; pages: number }[],
        weekStartDate: string
    ): Array<{
        key: string;
        value: number;
        date: string;
    }> => {
        // Parse date in local timezone to avoid UTC issues
        const [year, month, day] = weekStartDate.split("-").map(Number);
        const weekData = [];

        // Create data for each day of the week
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(year, month - 1, day + i);
            const dateString = currentDate.toISOString().split("T")[0];
            const dayName = dateUtils.getDayName(currentDate);

            // Filter recordings by comparing date strings
            const dayRecordings = recordings.filter((recording) => {
                const recordingDate = recording.date.split("T")[0];
                return recordingDate === dateString;
            });

            const totalPages = dayRecordings.reduce(
                (sum, recording) => sum + recording.pages,
                0
            );

            weekData.push({
                key: dayName,
                value: totalPages,
                date: dateString,
            });
        }
        return weekData;
    },

    /**
     * Format time display
     * @param minutes - The minutes to format
     * @returns The formatted time
     */
    formatTime: (minutes: number) => {
        if (minutes === 0) return { value: "0", unit: "m" };
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours > 0) {
            return remainingMinutes > 0
                ? { value: `${hours}h ${remainingMinutes}`, unit: "m" }
                : { value: `${hours}`, unit: "h" };
        }
        return { value: `${minutes}`, unit: "m" };
    },
};

export default dateUtils;
