import style from '../styles/gaming.module.css'

import { CardProductDetails } from '@/types/products'

interface GamingProps {
    products: CardProductDetails[]
}

// SECTION SHOWING 6 GAMING PRODUCTS
const Gaming = ({ products }: GamingProps) => {
    return <section className={style.section}></section>
}

export default Gaming
