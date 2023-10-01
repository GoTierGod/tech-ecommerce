import { redirect } from 'next/navigation'

import Logout from '@/app/(auth)/logout/_components/Logout'
import { getCustomer } from '@/utils/data/getCustomer'

export default async function Page() {
    const customer = getCustomer()
    if (!customer) redirect('api/auth/refresh/?auth=1&path=/logout')

    return <Logout />
}
