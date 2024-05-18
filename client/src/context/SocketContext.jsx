import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

const SocketContext = createContext()

export const useSocket = () => {
    let context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket is used inside the socket context');
    }
    return context;
}


const SocketProvider = ({ children }) => {
    const socketURL = import.meta.env.VITE_API_SOCKET_URL;
    const socket = useMemo(() => io(socketURL), []);
    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider