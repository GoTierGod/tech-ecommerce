import { Review } from './tables'

export interface ComposedReviewInfo {
    review: Review
    likes: number
    dislikes: number
}
