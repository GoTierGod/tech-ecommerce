'use client'

import { UserTokens } from '@/app/api/login/route'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { FormEvent, ReactNode, createContext, useState } from 'react'

interface AuthContextProps {
    user: string | null
    loginUser: (e: FormEvent<HTMLFormElement>) => void
}

const AuthContext = createContext({} as AuthContextProps)

export default AuthContext

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const cookie = Cookies.get('authTokens')
    const tokens: UserTokens | null = cookie ? JSON.parse(cookie) : null

    const [authTokens, setAuthTokens] = useState(tokens || null)
    const [user, setUser] = useState(tokens ? jwtDecode(tokens.access) : null)

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const username = e.currentTarget.username.value
        const password = e.currentTarget.password.value

        const res = await fetch(`/api/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if (res.ok) {
            const data = await res.json()

            setAuthTokens(data)
            setUser(jwtDecode(data.access))

            Cookies.set('authTokens', JSON.stringify(data))
        }
    }

    const contextData: AuthContextProps = {
        user: user,
        loginUser: loginUser
    } as AuthContextProps

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
