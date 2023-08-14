import { DecodedUserInfo, UserTokens } from '@/app/api/auth/login/route'
import { cookies } from 'next/dist/client/components/headers'
import jwtDecode from 'jwt-decode'
import { apiUrl } from './apiUrl'

// FETCH USER DATA USING VALID ACCESS TOKENS STORED IN COOKIES
export const getUser = async () => {
    try {
        // USER AUTH TOKENS STORED IN COOKIES
        const authTokens = cookies().get('authTokens')

        // CHECK IF THE REQUIRED COOKIES EXISTS
        if (authTokens) {
            const userTokens: UserTokens = JSON.parse(authTokens.value)

            // POST REQUEST TO GET USER INFORMATION
            const res = await fetch(`${apiUrl}/api/customer/`, {
                method: 'get',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userTokens.access}`
                }
            })

            // IF THE ACCESS TOKEN IS VALID, RETURN THE USER DATA
            if (res.ok) {
                const data = await res.json()
                return data
            }
        }

        return null
    } catch (err) {
        return null
    }
}
