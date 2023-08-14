import { ComposedProductInfo } from './products'
import { Brand, Category } from './tables'

export interface SearchResponse {
    results: number
    pages: number
    products: ComposedProductInfo[]
    categories: Category[]
    brands: Brand[]
}
