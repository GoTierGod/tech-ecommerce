import ProductRows from '@/components/ProductRows'
import style from './page.module.css'

import { getData } from '@/helpers/getData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDesc, faTasks } from '@fortawesome/free-solid-svg-icons'
import { CardProductDetails } from '@/types/products'
import VerticalCard from '@/components/VerticalCard'

export default async function Search({ params }: { params: { slug: string } }) {
    const { slug: search } = params
    const cleanedSearch = search.replace(/(\%20)+/g, ',')

    const products: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/search/${cleanedSearch}`
    )

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <div>
                        <button>
                            <FontAwesomeIcon icon={faSortAmountDesc} /> Sort
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faTasks} /> Filter
                        </button>
                    </div>
                    <h2>{search}</h2>
                </div>
                <div className={style.results}>
                    <h3>1.476 Results</h3>
                    <div className={style.grid}>
                        {products.map(product => (
                            <VerticalCard
                                key={product.details.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
