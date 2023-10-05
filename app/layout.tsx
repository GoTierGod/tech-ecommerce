import './globals.css'

import { Josefin_Sans } from 'next/font/google'
import { Metadata } from 'next'

import { Category } from '@/types/tables'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'
import { getCustomer } from '@/utils/data/getCustomer'
import { API_URL } from '@/constants/back-end'
import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/dist/client/components/headers'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Tech',
    description: 'Tech specialized E-Commerce project made by @GoTierGod.',
    openGraph: {
        images: ['/min.svg']
    }
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const categories: Category[] = await (async (): Promise<Category[]> => {
        const res = await fetch(`${API_URL}/api/categories/`, {})

        if (res.ok) return await res.json()

        return []
    })()

    const authCookies = cookies().get('authTokens')
    const customer = getCustomer()
    if (!customer && authCookies) redirect('api/auth/refresh/?auth=0&path=/')

    return (
        <html lang='en'>
            <body className={josefinSans.className}>
                <Header categories={categories} customer={customer} />
                {children}
                <Footer />
            </body>
        </html>
    )
}
