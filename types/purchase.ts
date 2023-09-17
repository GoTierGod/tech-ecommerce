import { ComposedProductInfo } from './product'
import { Order, OrderItem } from './tables'

export interface ComposedPurchaseData {
    order: Order
    order_item: OrderItem
    product: ComposedProductInfo
    is_reviewed: boolean
}
