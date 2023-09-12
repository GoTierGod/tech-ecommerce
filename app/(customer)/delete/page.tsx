import UserDelete from '@/app/(customer)/delete/_components/UserDelete'
import { getCustomer } from '@/utils/data/getCustomer'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Delete | Tech'
}

export default async function Page() {
    const customer = await getCustomer()
    if (!customer) redirect('/login')

    return <UserDelete customer={customer} />
}
