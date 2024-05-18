import { SendHorizonal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Message from '../components/Message';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import axios from "axios"
import { toast } from "react-hot-toast"
import DOMPurify from 'dompurify';

const Chat = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const socket = useSocket();
    const [message, setMessage] = useState('')
    const handleChange = (e) => {
        const sanitizedMessage = DOMPurify.sanitize(e.target.value);
        setMessage(sanitizedMessage);
    }
    const { user } = useAuth();
    const [messages, setMessages] = useState([])
    const sendMessage = async () => {
        if (message !== '') {
            socket.emit('sendMessage', { text: message, username: user?.userName });
            await axios.post(`${baseUrl}/message`, {
                text: message, username: user?.userName
            }).then((data) => {
                console.log(data)
            })
                .catch((err) => {
                    console.log(err);
                    return toast.error('Error while saving messages');
                })
            setMessages([...messages, { text: message, isSentByUs: true, userName: user?.userName }]);
            setMessage('');
        }
        else {
            return toast.error('Please Write Message')
        }
    };
    useEffect(() => {
        const fetchMessages = async () => {
            await axios.get(`${baseUrl}/get-messages`)
                .then((data) => {
                    const messagesData = data?.data.map(msg => {
                        return { ...msg, isSentByUs: msg?.username === user?.userName }
                    })
                    setMessages(messagesData)
                })
                .catch((err) => {
                    console.log(err);
                    return toast.error('Error while fetching messages');
                })
        }
        fetchMessages()
    }, [])

    useEffect(() => {

        socket.on('message', (newMessage) => {
            console.log(newMessage)
            if (!newMessage.isSentByUs) {
                setMessages([...messages, newMessage]);
            }
        });
        return () => {
            socket.off('message');
        };
    }, [socket, messages, user?.userName]);
    return (
        <div className='h-screen w-screen relative flex items-center justify-center overflow-hidden'>
            <div className='h-[500px] w-[600px] bg-emerald-100 rounded-full blur-[5rem] absolute -right-20 -top-10 -z-10' />
            <div className='h-[500px] w-[600px] bg-pink-100 rounded-full blur-[5rem] absolute left-20 -bottom-10 -z-10' />
            <div className='h-[500px] w-[600px] bg-orange-100 rounded-full blur-[5rem] absolute left-20 top-10 -z-10' />
            <div className='flex items-center justify-center w-full h-full flex-col gap-2'>
                <h1 className='text-[40px] font-dancing font-bold'>Chatty</h1>
                <div className='w-[95%] md:w-[60%] h-[80%] bg-white rounded-md shadow-md border flex flex-col p-3'>
                    <div className='flex-1 overflow-y-scroll p-1 flex flex-col'>
                        {messages.map((msg, index) => (
                            <Message key={index} isSentByUs={msg.isSentByUs} message={msg.text} username={msg.username} />
                        ))}
                    </div>
                    <div className='h-[50px] w-full flex gap-5'>
                        <div className='flex-1 items-center justify-center border-t'>
                            <Input placeholder={'Type Something here...'} noborder onChange={handleChange} value={message} />
                        </div>
                        <button className='w-[50px] flex items-center justify-center rounded-sm bg-blue-500' onClick={sendMessage}>
                            <SendHorizonal className='w-7 h-7 text-white' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat