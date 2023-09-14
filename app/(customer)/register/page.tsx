import UserRegister from '@/app/(customer)/register/_components/UserRegister'
import { getCustomer } from '@/utils/data/getCustomer'
import { redirect } from 'next/navigation'

export default async function Page() {
    const customer = getCustomer()
    if (customer) redirect('/')

    return <UserRegister />
}
