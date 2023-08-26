import { ComposedProductInfo } from './product'
import { Order, OrderItem } from './tables'

export interface Purchase {
    order: Order
    order_item: OrderItem
    is_reviewed: boolean
}

export interface PurchaseRequestData {
    products: { id: number; quantity: number }[]
    payment_method: string
    country: string
    city: string
    address: string
    notes: string
    coupon?: number | null
}

export interface ComposedPurchaseInfo {
    order: Order
    order_item: OrderItem
    product: ComposedProductInfo
    is_reviewed: boolean
}
