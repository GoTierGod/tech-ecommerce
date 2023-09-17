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

export interface ProductImage {
    id: number
    url: string
    description: string
    is_default: boolean

    product: string
}

export interface Review {
    id: number
    rating: number
    content: string
    date: string
    is_useful: boolean
    hidden: boolean

    customer: string
    product: string
}

export interface Order {
    id: number
    paid: number
    purchase_date: string
    delivery_term: string
    dispatched: boolean
    on_the_way: boolean
    delivered: boolean
    payment_method: string
    country: string
    city: string
    address: string
    notes: string

    customer: string
    delivery_man: string | null
}

export interface OrderItem {
    id: number
    total_cost: number
    quantity: number

    product: string
    order: string
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

export interface Coupon {
    id: number
    title: string
    amount: number
    customer: string
}
