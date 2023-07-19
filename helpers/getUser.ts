import { DecodedUserInfo, UserTokens } from '@/app/api/login/route'
import { cookies } from 'next/dist/client/components/headers'
import jwtDecode from 'jwt-decode'
import { apiUrl } from './apiUrl'

export const getUser = async () => {
    try {
        // USER AUTH TOKENS STORED AS COOKIES
        const authTokens = cookies().get('authTokens')

        if (authTokens) {
            const userTokens: UserTokens = JSON.parse(authTokens.value)
            const decodedUser: DecodedUserInfo = jwtDecode(userTokens.access)
            const username = decodedUser.username

            // POST REQUEST TO GET USER INFORMATION
            const res = await fetch(`${apiUrl}/api/user/`, {
                method: 'post',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userTokens.access}`
                },
                body: JSON.stringify({ username: username })
            })

            // IF THE ACCESS TOKEN WAS VALID, RETURN THE USER DATA
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
