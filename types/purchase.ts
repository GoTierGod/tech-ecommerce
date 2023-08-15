import { Order, OrderItem } from './table'

export interface PurchaseRequest {
    products: { id: number; quantity: number }[]
    payment_method: string
    delivery_term: string
    country: string
    city: string
    address: string
    notes: string
}

export interface Purchase {
    order: Order
    order_item: OrderItem
}
