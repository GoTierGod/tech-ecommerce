export interface Customer {
    id: number
    user: User
    points: number
    birthdate: string
    gender: string
    phone: string
    country: string
    city: string
    address: string
}

export interface User {
    id: number
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    last_login: string
    date_joined: string
    is_superuser: boolean
    is_staff: boolean
    is_active: boolean
    groups: Array<any>
    user_permissions: Array<any>
}

export interface DeliveryMan {
    id: number
    birthdate: unknown
    gender: string
    phone: string
    country: string
    city: string
    address: string
    vehicle_capacity: string
    license_plate_number: string
    availability: boolean
    user: User
}

export type CustomerData = Customer | null
