import React from 'react';
import { useAuth } from '../context/AuthContext';

const Message = ({ isSentByUs, message, username }) => {
    const alignmentClass = isSentByUs ? 'self-end' : 'self-start';
    const bgColorClass = !isSentByUs ? 'bg-green-400' : 'bg-black/80';
    const { user } = useAuth()
    return (
        <div className={`${alignmentClass} p-1 rounded-[4px] leading-tight max-w-[400px] w-[250px] ${bgColorClass} flex-col mb-3`}>
            {!isSentByUs && <span className='text-[12px] ml-1 font-bold tracking-wide'>{username}</span>}
            {isSentByUs && <span className='text-[12px] ml-1 font-bold tracking-wide text-white'>{user?.userName}</span>}
            <p className={`ml-1 mr-1 text-[16px] font-medium ${isSentByUs ? 'text-white/90' : 'text-black'}`}>
                {message}
            </p>
        </div>
    );
}

export default Message;
