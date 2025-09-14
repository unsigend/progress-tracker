// import dependencies
import axios from "axios";

// import global config
import globalConfig from "@/data/global";

// import types
import { type UserType } from "@/types/user.type";

const rootAPIConfig = `${globalConfig.apiRoot}/auth`;

const authAPI = {
    login: async (email: string, password: string) => {
        const response = await axios.post(`${rootAPIConfig}/login`, {
            email,
            password,
        });
        return response.data;
    },
    register: async (user: UserType) => {
        const response = await axios.post(`${rootAPIConfig}/register`, {
            email: user.email,
            password: user.password,
            username: user.username,
        });
        return response.data;
    },
    checkUserEmail: async (email: string): Promise<boolean> => {
        const response = await axios.get(
            `${rootAPIConfig}/email-check?email=${email}`
        );
        return response.data.exists;
    },
};

export default authAPI;
