import { redirect } from 'next/navigation'

import Logout from '@/app/(auth)/logout/_components/Logout'
import { getCustomer } from '@/utils/data/getCustomer'

export default async function Page() {
    const customer = await getCustomer()
    if (!customer) redirect('/')

    return <Logout />
}
