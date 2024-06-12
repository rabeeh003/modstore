import { Button, Checkbox, Input, Link } from '@nextui-org/react'
import axios from 'axios'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAdmin } from '../../redux/Admin'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from './utils/constData'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setMail] = useState('')
    const [password, setPass] = useState('')
    const [err, setErr] = useState('')

    const login = () => {
        axios.post(BaseUrl+"token/",
            {
                "username": username,
                "password": password
            }
        ).then((res) => {
            console.log(res);
            localStorage.setItem('token',res.data.access)
            dispatch(setAdmin(res.data))
            navigate('/admin')
        }).catch((err) => {
            setErr(true)
            console.log(err);
        })

    }

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className='container m-auto h-[100vh] flex justify-center align-middle'>
            <div className='max-w-md m-auto grid gap-4 '>
                <h2 className='text-center text-2xl font-bold '>Login</h2>
                <Input
                    autoFocus
                    endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Enter your username"
                    variant="bordered"
                    type='text'
                    onChange={(e) => setMail(e.target.value)}
                />
                <Input
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    label="Password"
                    placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    onChange={(e) => setPass(e.target.value)}
                />
                {/* <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                        classNames={{
                            label: "text-small",
                        }}
                    >
                        Remember me
                    </Checkbox>
                </div> */}
                {err && (<p className='text-danger-400 text-center'>Your username or password is wrong.</p>)}
                <Button onClick={() => login()} className='bg-success-400'>Login</Button>
            </div>
        </div>
    )
}

export default Login
