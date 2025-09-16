/**
 * Cryptographic and random utility functions
 */
export const crypto = {
    /**
     * Generate a cryptographically secure random state for OAuth
     * @returns A secure random string
     */
    generateSecureState: (): string => {
        // Use crypto.getRandomValues for better security than Math.random()
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            const array = new Uint8Array(16);
            crypto.getRandomValues(array);
            return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        }

        // Fallback for environments without crypto API
        return Math.random().toString(36).substring(2) +
               Math.random().toString(36).substring(2);
    },

    /**
     * Generate a random number between a minimum and maximum number
     * @param min - The minimum number to generate
     * @param max - The maximum number to generate
     * @returns A random number between the minimum and maximum numbers
     */
    generateRandomNumber: (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};

export default crypto;