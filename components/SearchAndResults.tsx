import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../styles/searchAndResults.module.css'

import { Brand, Category } from '@/types/tables'
import {
    faSearch,
    faSortAmountDesc,
    faTasks
} from '@fortawesome/free-solid-svg-icons'
import FilterForm from './FilterForm'
import { CardProductDetails } from '@/types/products'
import SearchCard from './SearchCard'

interface SearchProps {
    search: string
    categories: Category[]
    brands: Brand[]
    products: CardProductDetails[]
}

const SearchAndResults = ({
    search,
    categories,
    brands,
    products
}: SearchProps) => {
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.mobile}>
                    <div>
                        <button>
                            <FontAwesomeIcon icon={faSortAmountDesc} /> Sort
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faTasks} /> Filter
                        </button>
                    </div>
                    <h2>{search.replace(/(\s|\%20)+/g, ' ')}</h2>
                </div>
                <div className={style.desktop}>
                    <div>
                        <h2>
                            Searched Text <FontAwesomeIcon icon={faSearch} />
                        </h2>
                        <p>{search.replace(/(\s|\%20)+/g, ' ')}</p>
                    </div>
                    <div>
                        <h2>
                            Filters <FontAwesomeIcon icon={faTasks} />
                        </h2>
                        <FilterForm
                            search={search}
                            categories={categories}
                            brands={brands}
                        />
                    </div>
                </div>
            </div>
            <div className={style.results}>
                <div>
                    <span>1.476 Results</span>
                    <button>
                        <FontAwesomeIcon icon={faSortAmountDesc} /> Sort
                    </button>
                </div>
                <div className={style.grid}>
                    {products.map(product => (
                        <SearchCard
                            key={product.details.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchAndResults
