import { getHistory } from '@/utils/data/getHistory'
import { getCustomer } from '@/utils/data/getCustomer'
import { redirect } from 'next/navigation'
import PurchaseHistory from './_components/PurchaseHistory'

export default async function History() {
    const customer = await getCustomer()
    if (!customer) redirect('/login')

    const history = await getHistory()

    return <PurchaseHistory customer={customer} history={history} />
}
