import { Product, ProductImage } from './table'

export interface ComposedProductInfo {
    details: Product
    default_img: ProductImage
    images: ProductImage[]
    sold: number
    best_seller: boolean
    reviews_counter: number
    rating: number
}
