export interface AuthTokens {
    refresh: string
    access: string
}

export interface DecodedUserInfo {
    user_id: number
    token_type: string
    exp: number
    iat: number
    jti: string
}
