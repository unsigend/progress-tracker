// import dependencies
import axios from "axios";

// import global config
import globalConfig from "@/data/global";

// import types
import { type UserType } from "@root/shared/types";

// API config for user
const userAPIConfig = {
    checkUserEmail: `${globalConfig.apiConfig.userAPIRoot}/email/check`,
    getUserByEmail: `${globalConfig.apiConfig.userAPIRoot}/email/:email`,
    createUser: `${globalConfig.apiConfig.userAPIRoot}`,
    deleteUserById: `${globalConfig.apiConfig.userAPIRoot}`,
    updateUserById: `${globalConfig.apiConfig.userAPIRoot}`,
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

    /**
     * Create a user
     * @param user - the user to create
     * @returns {Promise<UserType>} - the response from the API
     */
    createUser: async (user: UserType) => {
        const response = await axios.post(userAPIConfig.createUser, user);
        console.log(response.data);
        return response.data;
    },

    /**
     * Update a user by ID
     * @param id - the id of the user to update
     * @param user - the user to update
     * @returns {Promise<UserType>} - the response from the API
     */
    updateUserById: async (id: string, user: UserType) => {
        const response = await axios.put(
            `${userAPIConfig.updateUserById}/${id}`,
            user
        );
        return response.data;
    },

    /**
     * Delete a user by ID
     * @param id - the id of the user to delete
     * @returns {Promise<UserType>} - the response from the API
     */
    deleteUserById: async (id: string) => {
        const response = await axios.delete(
            `${userAPIConfig.deleteUserById}/${id}`
        );
        return response.data;
    },
};

export default userAPI;
