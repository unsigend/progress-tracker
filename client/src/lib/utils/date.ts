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
};

export default dateUtils;
