export interface ComposedCustomerData {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    birthdate: string
    gender: string
    phone: string
    country: string
    city: string
    address: string
    points: number
}

export type CustomerData = ComposedCustomerData | null
