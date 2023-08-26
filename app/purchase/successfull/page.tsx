import Link from 'next/link'
import style from './page.module.css'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await getUser()
    if (!user) redirect('/api/auth/refresh?path=/purchase/successfull&auth=1')

    return (
        <main>
            <div className={style.wrapper}>
                <h1>Successfully purchased</h1>
                <div className={style.content}>
                    <h2>Delivery Phases</h2>
                    <p>
                        <span>Dispatched:</span> In this phase, your ecommerce
                        order transitions from processing to physical
                        fulfillment. Products are carefully gathered, packed,
                        and labeled for shipping. Customers receive
                        notifications with tracking details as their items leave
                        the warehouse.
                    </p>
                    <p>
                        <span>On the way:</span> During this phase, packed
                        orders are in transit to their destination. Customers
                        can track their orders in real-time, ensuring
                        transparency and managing expectations. Potential delays
                        might be communicated, maintaining trust.
                    </p>
                    <p>
                        <span>Delivered</span> This phase is the culmination.
                        Customers receive their products, marking a successful
                        transaction. This phase often triggers feedback requests
                        and further engagement opportunities, influencing future
                        buying decisions.
                    </p>
                    <div className={style.options}>
                        <Link href='/history'>Purchase History</Link>
                        <Link href='/'>Back to Home</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
