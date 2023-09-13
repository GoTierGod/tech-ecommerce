import { API_URL } from '@/constants/back-end'
import { ComposedReviewInfo } from '@/types/review'

export const getReviews = async (id: string): Promise<ComposedReviewInfo[]> => {
    const res = await fetch(`${API_URL}/api/reviews/product/${id}`)

    if (res.ok) return await res.json()

    return []
}
