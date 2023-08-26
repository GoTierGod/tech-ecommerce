import PurchaseHistory from '@/components/PurchaseHistory'
import { getHistory } from '@/utils/data/getHistory'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function History() {
    const user = await getUser()
    if (!user) redirect('/api/auth/refresh?path=/history&auth=1')

    const history = await getHistory()

    return <PurchaseHistory history={history} />
}
