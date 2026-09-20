"use client"
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import InputForm from './inputForm'
import { useCounter } from '../store/uesCounter'
import { useUserStore } from '../store/uesrStore'
export default function page() {
    const schema = z.object({
        username: z.string().min(3, { message: "Username is required" }),
        Email: z.string().min(1, { message: 'email is required' }).email({ message: 'Invalid email address' }),
        password: z.string().min(6, { message: 'password must be at least 6 characters long' }).max(20, { message: 'password must be at most 20 characters long' }),
        confirmPassword: z.string().min(6, { message: 'confirm password must be at least 6 characters long' }).max(20, { message: 'confirm password must be at most 20 characters long' })

    }).refine((data) => data.confirmPassword === data.password, {
        message: "Passwords don't match",
        path: ['confirmPassword'], // path of error
    })
    type isignup = z.infer<typeof schema>
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<isignup>({
        mode: 'onChange',
        resolver: zodResolver(schema)
    })
    const formeSubmit: SubmitHandler<isignup> = ({ Email, password, username }) => {
        const uesr = {
            Email,
            password,
            username
        }
        console.log(uesr);
        reset()

    }
    const inputs = [
        { type: 'email', placeholder: 'Email', register: register('Email'), error: errors.Email?.message },
        { type: 'text', placeholder: 'Username', register: register('username'), error: errors.username?.message },
        { type: 'password', placeholder: 'Password', register: register('password'), error: errors.password?.message },
        { type: 'password', placeholder: 'Confirm Password', register: register('confirmPassword'), error: errors.confirmPassword?.message }
    ]
    const { count, increaseCount, decreaseCount, removeCount } = useCounter()
    const { uesrName, login, logout } = useUserStore()
    const [username, setUsername] = useState('')
    return (
        <>

            <form onSubmit={handleSubmit(formeSubmit)}>
                {inputs.map((input, i) => (
                    <div key={i} className='m-3'>
                        <InputForm key={i} type={input.type} placeholder={input.placeholder} register={input.register} />
                        {input.error && <span>{input.error}</span>}
                    </div>
                ))}
                <button type='submit' disabled={isSubmitting}>
                    login
                </button>
            </form>
            <div>
                <h1>Count : {count}</h1>
                <button className='block' onClick={increaseCount}>+</button>
                <button className='block' onClick={count > 0 ? decreaseCount : undefined}>-</button>
                <button className='block' onClick={removeCount}>Remove</button>
            </div>
            <div>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button onClick={() => login(username)}>log in</button>
                <h1>{uesrName}</h1>
                <button onClick={logout}>log out</button>
            </div>
        </>
    )
}
