import style from '../styles/offers.module.css'

import { CardProductDetails } from '@/types/products'

interface OffersProps {
    products: CardProductDetails[]
}

// SECTION SHOWING 3 RANDOM OFFERS
const Offers = ({ products }: OffersProps) => {
    return <section className={style.section}></section>
}

export default Offers
