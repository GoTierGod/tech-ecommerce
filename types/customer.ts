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

export interface CustomerInteractions {
    likes: Array<number>
    dislikes: Array<number>
    reports: Array<number>
}

export type CustomerData = ComposedCustomerData | null
