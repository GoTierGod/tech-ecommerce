export interface LoginRequestData {
    username: string
    password: string
}

export interface LogoutRequestData {
    refresh: string
}

export interface RefreshRequestData {
    refresh: string
}

export interface UserCreateRequestData {
    username: string
    email: string
    password: string
    birthdate: string
}

export interface UserDeleteRequestData {
    password: string
}
