import { DecodedUserInfo, UserTokens } from '@/app/api/login/route'
import { cookies } from 'next/dist/client/components/headers'
import jwtDecode from 'jwt-decode'

export const getUser = () => {
    const authTokens = cookies().get('authTokens')

    if (authTokens) {
        const userTokens: UserTokens = JSON.parse(authTokens.value)
        const user: DecodedUserInfo = jwtDecode(userTokens.access)

        return user.username
    }

    return null
}
