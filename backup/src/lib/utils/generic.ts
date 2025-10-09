/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Generic utility functions
 */
const genericUtils = {
    /**
     * Remove empty fields from an object
     * @param obj - The object to remove empty fields from
     * @returns The object with empty fields removed
     */
    removeEmptyFields: (obj: any) => {
        return Object.fromEntries(
            Object.entries(obj).filter(
                ([_, value]) =>
                    value !== "" && value !== undefined && value !== null
            )
        );
    },

    /**
     * Transform null values to empty strings in an object
     * @param obj - The object to transform null values to empty strings
     * @returns The object with null values transformed to empty strings
     */
    transformNullToEmptyString: (obj: any) => {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key,
                value === null ? "" : value,
            ])
        );
    },

    /**
     * safely assign an old object to a new object
     * only assign the fields that in the newObj,
     *   and drop the fields that are not in the newObj
     * @param newObj - the new object to assign to
     * @param oldObj - the old object to assign from
     * @returns the new object with the fields assigned
     */
    safelyAssignObject: (newObj: any, oldObj: any) => {
        return Object.fromEntries(
            Object.entries(newObj).map(([key, value]) => [
                key,
                oldObj[key] !== undefined
                    ? oldObj[key] === null
                        ? ""
                        : oldObj[key]
                    : value,
            ])
        );
    },
};

export default genericUtils;
