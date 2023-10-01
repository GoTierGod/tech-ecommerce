import { getHistory } from '@/utils/data/getHistory'
import { getCustomer } from '@/utils/data/getCustomer'
import { redirect } from 'next/navigation'
import PurchaseHistory from './_components/PurchaseHistory'

export default async function History() {
    const customer = getCustomer()
    if (!customer) redirect('api/auth/refresh/?auth=1&path=/history')

    const history = await getHistory()

    return <PurchaseHistory customer={customer} history={history} />
}
