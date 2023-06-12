import style from '../styles/highlighted.module.css'

import { CardProductDetails } from '@/types/products'

interface HighlightedProps {
    products: CardProductDetails[]
}

// SECTION SHOWING TWO HIGHLIGHTED CATEGORIES AND ONE PRODUCT FOR EACH ONE
const Highlighted = ({ products }: HighlightedProps) => {
    return <section className={style.section}></section>
}

export default Highlighted
