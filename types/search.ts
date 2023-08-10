import { CardProductDetails } from './products'
import { Brand, Category } from './tables'

export interface SearchResponse {
    results: number
    pages: number
    products: CardProductDetails[]
    categories: Category[]
    brands: Brand[]
}
