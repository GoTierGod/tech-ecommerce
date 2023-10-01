import UserDelete from '@/app/(customer)/delete/_components/UserDelete'
import { getCustomer } from '@/utils/data/getCustomer'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Delete | Tech'
}

export default async function Page() {
    const customer = getCustomer()
    if (!customer) redirect('api/auth/refresh/?auth=1&path=/delete')

    return <UserDelete customer={customer} />
}
