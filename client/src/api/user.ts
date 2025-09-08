// import dependencies
import axios from "axios";

// import global config
import globalConfig from "@/data/global";

// API config for user
const userAPIConfig = {
    checkUserEmail: `${globalConfig.apiConfig.userAPIRoot}/email/check`,
    getUserByEmail: `${globalConfig.apiConfig.userAPIRoot}/email/:email`,
    createUser: `${globalConfig.apiConfig.userAPIRoot}`,
    deleteUserById: `${globalConfig.apiConfig.userAPIRoot}/:id`,
    updateUserById: `${globalConfig.apiConfig.userAPIRoot}/:id`,
};

// API for user
const userAPI = {
    /**
     * Check if a user email is already in use
     * @param email - the email to check
     * @returns {Promise<{exists: boolean, message: string}>} - the response from the API
     */
    checkUserEmail: async (email: string) => {
        const response = await axios.get(
            `${userAPIConfig.checkUserEmail}?email=${email}`
        );
        return response.data;
    },
};

export default userAPI;
