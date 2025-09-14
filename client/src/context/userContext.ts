// import dependencies
import { createContext } from "react";

// import types
import type { ResponseUserDto } from "@/api/api";

// create user context
const UserContext = createContext<{
    user: ResponseUserDto;
    setUser: (user: ResponseUserDto) => void;
} | null>(null);

export default UserContext;
