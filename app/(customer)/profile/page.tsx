import { getCustomer } from '@/utils/data/getCustomer'
import UserProfile from '@/app/(customer)/profile/_components/UserProfile'
import { redirect } from 'next/navigation'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile | Tech'
}

export default async function Page() {
    const customer = getCustomer()
    if (!customer) redirect('/login')

    metadata.title = `${titleCaseFormatter(customer.user.username)} | Tech`

    return <UserProfile customer={customer} />
}
