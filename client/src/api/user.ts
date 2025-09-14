// import dependencies
import axios from "axios";

// import global config
import globalConfig from "@/data/global";

// import types
import { type UserType } from "@/types/user.type";

const rootAPIConfig = `${globalConfig.apiRoot}/user`;

const userAPI = {
    createUser: async (user: UserType) => {
        const response = await axios.post(rootAPIConfig, user);
        return response.data;
    },
    deleteUserById: async (id: string) => {
        const response = await axios.delete(`${rootAPIConfig}/${id}`);
        return response.data;
    },
    updateUserById: async (id: string, user: UserType) => {
        const response = await axios.put(`${rootAPIConfig}/${id}`, user);
        return response.data;
    },
};

export default userAPI;
