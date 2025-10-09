/**
 * Validation utility functions
 */
// import constants
import VALIDATION_CONSTANTS from "@/features/auth/constants/validation";

export const validationUtils = {
    /**
     * Validate an email address
     * @param email - the email to validate
     * @returns {boolean} true if the email is valid, false otherwise
     */
    email: (email: string): boolean => {
        const emailRegex = VALIDATION_CONSTANTS.EMAIL_REGEX;
        return emailRegex.test(email);
    },

    /**
     * Validate a password
     * @param password - the password to validate
     * @returns {boolean} true if the password is valid (at least 8 characters),
     *  false otherwise
     */
    password: (password: string): boolean => {
        return (
            password.length >= VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH &&
            password.length <= VALIDATION_CONSTANTS.PASSWORD_MAX_LENGTH
        );
    },

    /**
     * Validate a username
     * @param username - the username to validate
     * @returns {boolean} true if the username is valid (3-20 characters), false otherwise
     */
    username: (username: string): boolean => {
        return (
            username.length >= VALIDATION_CONSTANTS.USERNAME_MIN_LENGTH &&
            username.length <= VALIDATION_CONSTANTS.USERNAME_MAX_LENGTH
        );
    },
};

export default validationUtils;
