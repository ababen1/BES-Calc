import { createContext } from "react";

const UserContext = createContext({
    username: "",
    set_username: () => {},
});

export default UserContext;