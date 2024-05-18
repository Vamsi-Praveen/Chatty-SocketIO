import axios from "axios"
import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const { setUser, setToken, user } = useAuth()
    const navigation = useNavigate()
    useEffect(() => {
        if (user) {
            navigation('/')
        }
    }, [])
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleLogin = async () => {
        try {
            setLoading(true);
            if (loginDetails.email == '' || loginDetails.password == '') {
                return toast.error('Please enter all feilds');
            }
            await axios.post('http://localhost:4000/api/login', loginDetails)
                .then((data) => {
                    setToken(data?.headers?.authorization);
                    setUser({ userId: data?.data?.userId, userName: data?.data?.userName });
                    toast.success('Login success');
                    navigation('/')
                })
                .catch((err) => {
                    if (err?.response?.data?.error == 'Invalid credentials') {
                        toast.error('Invalid credentials')
                    }
                })
        } catch (error) {
            console.log(error)
            return toast.error('Error');
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='h-screen w-screen relative flex items-center justify-center overflow-hidden'>
            <div className='h-[500px] w-[600px] bg-emerald-100 rounded-full blur-[5rem] absolute -right-20 -top-10 -z-10' />
            <div className='h-[500px] w-[600px] bg-pink-100 rounded-full blur-[5rem] absolute left-20 -bottom-10 -z-10' />
            <div className='flex items-center justify-center w-full flex-col gap-3'>
                <h1 className='text-[40px] font-dancing font-bold'>Chatty</h1>
                <div className='bg-white p-5 rounded-md border border-gray-100 shadow-md md:min-w-[370px] min-w-[300px]'>
                    <h1 className='font-semibold text-xl ml-1'>Welcome back, 🖐</h1>
                    <div className='mt-2 space-y-2'>
                        <Input type={"text"} placeholder={"Email Address"} onChange={handleChange} name={"email"} />
                        <Input type={"password"} placeholder={"Password"} onChange={handleChange} name={"password"} />
                    </div>
                    <div className='mt-4 ml-1'>
                        <div className={`cursor-pointer ${loading ? 'bg-blue-400 pointer-events-none' : 'bg-blue-500 pointer-events-auto'} flex items-center justify-center p-2 rounded-[3px] hover:bg-blue-600 transition-all`}
                            onClick={handleLogin}
                        >
                            <p className='font-bold text-white tracking-wide'>{loading ? 'Logging in...' : 'Login'}</p>
                        </div>
                        <div className='mt-3'>
                            <p className='text-sm'>Don't have an account ?&nbsp;<Link to={'/register'}><span className='text-blue-600 font-medium underline cursor-pointer'>Create one</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login