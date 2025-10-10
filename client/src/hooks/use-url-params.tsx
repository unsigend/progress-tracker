/**
 * Hook for updating URL parameters
 * @param searchParams - The URLSearchParams object
 * @param updates - The updates to be made to the URL parameters
 * @returns A function for updating URL parameters
 */
const useUpdateUrlParams = () => {
    return (
        searchParams: URLSearchParams,
        updates: Record<string, string | number | undefined>
    ) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === "") {
                newParams.delete(key);
            } else {
                newParams.set(key, value.toString());
            }
        });

        return newParams;
    };
};

export { useUpdateUrlParams };
