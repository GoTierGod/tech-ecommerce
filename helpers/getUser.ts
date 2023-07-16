import { DecodedUserInfo, UserTokens } from '@/app/api/login/route'
import { cookies } from 'next/dist/client/components/headers'
import jwtDecode from 'jwt-decode'
import { apiUrl } from './apiUrl'

export const getUser = async () => {
    try {
        const authTokens = cookies().get('authTokens')

        if (authTokens) {
            const userTokens: UserTokens = JSON.parse(authTokens.value)
            const decodedUser: DecodedUserInfo = jwtDecode(userTokens.access)
            const username = decodedUser.username

            const res = await fetch(`${apiUrl}/api/user/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userTokens.access}`
                },
                body: JSON.stringify({ username: username })
            })

            if (res.ok) {
                const customer = await res.json()
                return customer
            }
        }

        return null
    } catch (err) {
        return null
    }
}
