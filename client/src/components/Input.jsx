import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

const Input = ({ placeholder, value, type, onChange, name, disabled, checked, noborder, defaultValue }) => {
    const [passwordVisibilty, setPasswordVisibility] = useState(false)
    const inputType = type === "password" ? passwordVisibilty ? 'text' : 'password' : type
    return (
        <div className={`relative ${type == 'radio' || noborder ? 'border-none' : 'border-b'} border-gray-200 `}>
            <input
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                type={inputType}
                onChange={onChange}
                className={`w-full border-none outline-none focus:border-none py-2 pl-0.5 ${type === "radio" ? 'cursor-pointer' : "cursor-auto"}`}
                autoComplete={"off"}
                autoCorrect={"off"}
                disabled={disabled}
                checked={checked}
            />
            <div>
                {
                    type === "password" &&
                    <div className='absolute right-0 top-1/2 -translate-y-1/2'>
                        {
                            passwordVisibilty ? <EyeOff onClick={() => {
                                setPasswordVisibility(prev => !prev)
                            }}
                                className='h-5 w-5 text-gray-400'
                            /> : <Eye onClick={() => { setPasswordVisibility(prev => !prev) }} className='h-5 w-5 text-gray-400' />
                        }
                    </div>
                }
            </div>

        </div>
    )
}

export default Input