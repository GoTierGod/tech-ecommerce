import { API_URL } from '@/constants/back-end'
import { ComposedReviewInfo } from '@/types/review'

export const getReviews = async (id: string): Promise<ComposedReviewInfo[]> => {
    const res = await fetch(`${API_URL}/api/reviews/${id}`, {
        next: { revalidate: 3600 }
    })

    if (res.ok) return await res.json()

    return []
}