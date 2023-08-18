import { Customer, DeliveryMan } from './user'

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

    product: string
}

export interface ProductImage {
    id: number
    url: string
    description: string
    is_default: boolean

    product: string
}

export interface Review {
    id: number
    rating: string
    title: string
    content: string
    date: string
    likes: number
    dislikes: number
    is_useful: boolean

    customer: string
    product: string
}

export interface Order {
    id: number
    payment_method: string
    delivery_term: unknown
    dispatched: boolean
    on_the_way: boolean
    delivered: boolean
    purchase_date: unknown
    country: string
    city: string
    address: string
    postal_code: string | null
    notes: string

    delivery_man: string | null
}

export interface OrderItem {
    id: number
    total_cost: number
    quantity: number

    order: string
    customer: string
    product: Product
}

export interface CardItem {
    id: number
    product: Product
    customer: string
}

export interface FavItem {
    id: number
    product: Product
    customer: string
}
