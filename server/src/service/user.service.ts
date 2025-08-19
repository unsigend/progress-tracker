import UserModel from "@/models/user.model";
import { UserType } from "@root/shared/types";

const userService = {
    createUser: async (user: UserType) => {},
    getUserByEmail: async (email: string) => {},
    getUserByID: async (id: string) => {},
    updateUser: async (id: string, user: UserType) => {},
    deleteUserByID: async (id: string) => {},
};

export default userService;
