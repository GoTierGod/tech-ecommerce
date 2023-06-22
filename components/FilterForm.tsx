import style from '../styles/filterForm.module.css'

const FilterForm = () => {
    return (
        <form className={style.form}>
            <div className={style.priceFilter}>
                <h3>Price</h3>
                <div>
                    <div>
                        <label htmlFor='min-price'>Min.</label>
                        <input
                            type='text'
                            name='min-price'
                            id='min-price'
                            placeholder='$ 0.00'
                        />
                    </div>
                    <div>
                        <label htmlFor='min-price'>Max.</label>
                        <input
                            type='text'
                            name='max-price'
                            id='max-price'
                            placeholder='$ ∞'
                        />
                    </div>
                </div>
            </div>
            <div className={style.gamingFilter}>
                <h3>Gaming</h3>
                <div>
                    <span>Any</span>
                    <span>Yes</span>
                    <span>No</span>
                </div>
            </div>
            <div className={style.categoryFilter}>
                <label htmlFor='category'>Category</label>
                <select name='category' id='category'>
                    <option value=''>Any</option>
                </select>
            </div>
            <div className={style.brandFilter}>
                <label htmlFor='brand'>Category</label>
                <select name='brand' id='brand'>
                    <option value=''>Any</option>
                </select>
            </div>
            <div className={style.installmentsFilter}>
                <label htmlFor='installments'>Category</label>
                <select name='installments' id='installments'>
                    <option value=''>Any</option>
                </select>
            </div>
        </form>
    )
}

export default FilterForm
