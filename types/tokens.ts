export interface UserTokens {
    refresh: string
    access: string
}

export interface DecodedUserInfo {
    user_id: number
    username: string
    token_type: string
    exp: number
    iat: number
    jti: string
}
