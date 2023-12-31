import Link from 'next/link'
import style from './page.module.css'
import { getCustomer } from '@/utils/data/getCustomer'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const customer = getCustomer()
    if (!customer) redirect('/login')

    return (
        <main>
            <div className={style.wrapper}>
                <h1>Successfully purchased</h1>
                <div className={style.content}>
                    <h2>Delivery Phases</h2>
                    <p>
                        <span>Dispatched:</span> In this phase, your order
                        transitions from processing to physical fulfillment.
                        Products are carefully gathered, packed, and labeled for
                        shipping.
                    </p>
                    <p>
                        <span>On the way:</span> During this phase, packed
                        orders are in transit to their destination.
                    </p>
                    <p>
                        <span>Delivered</span> This phase is the culmination.
                        You will receive the purchased products, marking a
                        successful transaction. Now you can leave a review for
                        any of your products.
                    </p>
                    <div className={style.options}>
                        <Link href='/history' prefetch={false}>
                            Purchase History
                        </Link>
                        <Link href='/' prefetch={false}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
