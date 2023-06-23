import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// GET STARS ACCORDING TO RATING USING FONT AWESOME ICONS
export const getStars = (reviews_ct: number, rating: number) => {
    const stars: Array<JSX.Element> = []

    if (!reviews_ct) {
        for (let i = 0; i < 5; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} />)
        }

        return stars
    }

    const productRating = rating

    const wholeStars = productRating - (productRating % 1)

    for (let i = 0; i < wholeStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />)
    }

    if (productRating - wholeStars >= 0.6) {
        stars.push(<FontAwesomeIcon key={wholeStars + 1} icon={faStar} />)
    } else if (productRating - wholeStars >= 0.1) {
        stars.push(<FontAwesomeIcon key={wholeStars + 1} icon={faStarHalf} />)
    }

    return stars
}
