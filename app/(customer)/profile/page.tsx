import { getCustomer } from '@/utils/data/getCustomer'
import UserProfile from '@/app/(customer)/profile/_components/UserProfile'
import { redirect } from 'next/navigation'
import { capitalizeFormatter } from '@/utils/formatting/capitalizeFormatter'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile | Tech'
}

export default async function Page() {
    const customer = getCustomer()
    if (!customer) redirect('/login')

    metadata.title = `${capitalizeFormatter(customer.username)} | Tech`

    return <UserProfile customer={customer} />
}
