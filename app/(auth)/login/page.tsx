import { redirect } from 'next/navigation'

import { getCustomer } from '@/utils/data/getCustomer'
import Login from '@/app/(auth)/login/_components/Login'

export default async function Page() {
    const customer = await getCustomer()
    if (customer) redirect('/')

    return <Login />
}
