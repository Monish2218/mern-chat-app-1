import { createContext, useContext, useMemo, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	const value = useMemo(() => ({ authUser, setAuthUser }), [authUser, setAuthUser]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
