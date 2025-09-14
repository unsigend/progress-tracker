/**
 * Random utility
 */
const random = {
    /**
     * Generate a random number between a minimum and maximum number
     * @param min - The minimum number to generate
     * @param max - The maximum number to generate
     * @returns A random number between the minimum and maximum numbers
     */
    generateRandomNumber: (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};

export default random;
