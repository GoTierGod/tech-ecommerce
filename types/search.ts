import { CardProductDetails } from './products'
import { Brand, Category } from './tables'

export interface SearchResponse {
    pages: number
    products: CardProductDetails[]
    categories: Category[]
    brands: Brand[]
}
