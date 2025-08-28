/**
 * @module ISBN
 * @description module for validating ISBN
 */

const isValidISBN = (ISBN: string): boolean => {
    if (!ISBN || typeof ISBN !== "string") return false;

    // Remove hyphens and spaces for validation
    const cleanISBN = ISBN.replace(/[-\s]/g, "");

    // Check for ISBN-10 (10 digits, last can be X)
    if (cleanISBN.length === 10) {
        return /^\d{9}[\dX]$/i.test(cleanISBN);
    }

    // Check for ISBN-13 (13 digits starting with 978 or 979)
    if (cleanISBN.length === 13) {
        return /^(978|979)\d{10}$/.test(cleanISBN);
    }

    // Also allow original format with hyphens (10-17 characters total)
    if (ISBN.length >= 10 && ISBN.length <= 17) {
        // ISBN-10 with hyphens
        if (/^\d{1,5}-\d{1,7}-\d{1,6}-[\dX]$/i.test(ISBN)) return true;
        // ISBN-13 with hyphens
        if (/^(978|979)-\d{1,5}-\d{1,7}-\d{1,6}-\d$/.test(ISBN)) return true;
    }

    return false;
};

export { isValidISBN };
