import { createContext, useState } from "react";

// إنشاء السياق
export const user = createContext({});

function UserProvider({ children }) {
  const [Auth, setAuth] = useState({});
  return <user.Provider value={{ Auth, setAuth }}>{children}</user.Provider>;
}

export default UserProvider;
