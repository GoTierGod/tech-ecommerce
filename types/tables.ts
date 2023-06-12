export interface User {
    id: number
    username: string
    password: string
    first_name: string
    last_name: string
    email: string
    is_superuser: boolean
    is_staff: boolean
    is_active: boolean
    last_login: unknown
    date_joined: unknown
}

export interface Category {
    id: number
    title: string
    description: string
    icon: string
}

export interface Brand {
    id: number
    name: string
    description: string
    website_url: string
    logo_url: string
}

export interface Customer {
    id: number
    birthdate: unknown
    gender: string
    phone: string
    country: string
    city: string
    address: string
    points: number
    user: User
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

export interface Product {
    id: number
    name: string
    description: string
    color: string
    price: string
    offer_price: string
    installments: number
    stock: number
    months_warranty: number
    brand: Brand
    category: Category
}

export interface ProductSpecification {
    id: number
    key: string
    value: string
    product: Product | number
}

export interface ProductImage {
    id: number
    url: string
    description: string
    is_default: boolean
    product: Product | number
}

export interface Review {
    id: number
    rating: string
    title: string
    content: string
    date: unknown
    likes: number
    dislikes: number
    useful: boolean
    customer: Customer | number
    product: Product | number
}

export interface Order {
    id: number
    total_cost: string
    quantity: number
    shipping_charge: string
    delivered: boolean
    purchase_date: unknown
    delivery_term: unknown
    notes: string
    payment_method: string
    country: string
    city: string
    address: string
    postal_code: string
    customer: Customer | number
    product: Product | number
    delivery_man: DeliveryMan | number
}
