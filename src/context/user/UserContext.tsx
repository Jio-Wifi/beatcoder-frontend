import { createContext } from "react";
import type { UserContextProps } from "../../types/user/user.types";

export const UserContext = createContext<UserContextProps | undefined>(undefined);
