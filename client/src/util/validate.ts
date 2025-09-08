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
};

export default validate;
