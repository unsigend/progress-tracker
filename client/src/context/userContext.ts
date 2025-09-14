// import dependencies
import { createContext } from "react";

// import types
import { type UserType } from "@/types/user.type";

// create user context
const UserContext = createContext<{
    user: UserType;
    setUser: (user: UserType) => void;
} | null>(null);

export default UserContext;
