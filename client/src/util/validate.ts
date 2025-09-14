const validate = {
    /**
     * Validate an email address
     * @param email - the email to validate
     * @returns {boolean} true if the email is valid, false otherwise
     */
    email: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate a password
     * @param password - the password to validate
     * @returns {boolean} true if the password is valid (at least 8 characters), false otherwise
     */
    password: (password: string): boolean => {
        return password.length >= 8;
    },

    /**
     * Validate a username
     * @param username - the username to validate
     * @returns {boolean} true if the username is valid (3-20 characters), false otherwise
     */
    username: (username: string): boolean => {
        return username.length >= 3 && username.length <= 20;
    },
};

export default validate;
