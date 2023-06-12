import { Product, ProductImage } from './tables'

// DETAILED DATA OF A PRODUCT
export interface FullProductDetails {
    details: Product
    images: ProductImage[]
    sold: number
    reviews_counter: number
    rating: number
}

// LESS DETAILED DATA OF A PRODUCT
export interface CardProductDetails {
    details: Product
    image: ProductImage
    sold: number
}
