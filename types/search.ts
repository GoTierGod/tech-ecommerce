import { ComposedProductInfo } from './product'
import { Brand, Category } from './table'

export interface SearchResponse {
    results: number
    pages: number
    products: ComposedProductInfo[]
    categories: Category[]
    brands: Brand[]
}
