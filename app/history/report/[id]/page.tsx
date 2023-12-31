import NotImplemented from '@/components/NotImplemented'

import { getPurchase } from '@/utils/data/getPurchase'
import { getCustomer } from '@/utils/data/getCustomer'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const customer = getCustomer()
    if (!customer) redirect(`api/auth/refresh/?auth=1&path=/history/report`)

    const purchase = await getPurchase(id)
    if (!purchase) redirect('')

    return <NotImplemented />
}
