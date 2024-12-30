import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:5000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else if (socket) {
			socket.close();
			setSocket(null);
		}
	}, [authUser, socket]);

	const value = useMemo(() => ({ socket, onlineUsers }), [socket, onlineUsers]);
	return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
