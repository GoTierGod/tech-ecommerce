import { Product, ProductImage } from './tables'

export interface ComposedProductInfo {
    details: Product
    default_img: ProductImage
    images: ProductImage[]
    sold: number
    reviews_counter: number
    rating: number
}
