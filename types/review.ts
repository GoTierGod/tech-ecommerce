import { Review } from './tables'

export interface ComposedReviewData {
    review: Review
    likes: number
    dislikes: number
}
