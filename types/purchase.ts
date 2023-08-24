import { Order, OrderItem } from './tables'

export interface PurchaseRequestData {
    products: { id: number; quantity: number }[]
    payment_method: string
    country: string
    city: string
    address: string
    notes: string
}

export interface Purchase {
    order: Order
    order_item: OrderItem
    is_reviewed: boolean
}
