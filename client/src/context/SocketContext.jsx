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

    const socket = useMemo(() => io('http://localhost:4000'), []);
    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider