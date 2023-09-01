import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './product-review.module.css'
import {
    faClock,
    faExclamation,
    faStar,
    faThumbsDown,
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons'
import { Review } from '@/types/tables'

interface ProductReviewProps {
    review: Review
}

export default function ProductReview({ review }: ProductReviewProps) {
    return (
        <div className={style.card}>
            <div className={style.header}>
                <div>
                    <h3>@verylongusernametest</h3>
                </div>
                <div>
                    <h3>{review.rating}</h3>
                    <FontAwesomeIcon icon={faStar} />
                </div>
            </div>
            <div className={style.content}>
                <p>{review.content}</p>
            </div>
            <div className={style.footer}>
                <div>
                    <button className={style.likes}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <span>{review.likes}</span>
                    </button>
                    <button className={style.dislikes}>
                        <FontAwesomeIcon icon={faThumbsDown} />
                        <span>{review.dislikes}</span>
                    </button>
                </div>
                <button>
                    <span>Report</span>
                    <FontAwesomeIcon icon={faExclamation} />
                </button>
            </div>
        </div>
    )
}
