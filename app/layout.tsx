import './globals.css'

import { Josefin_Sans } from 'next/font/google'
import { Metadata } from 'next'

import { Category } from '@/types/tables'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'
import { getData } from '@/utils/data/getData'
import { getUser } from '@/utils/data/getUser'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Tech',
    description: 'The best products in technology'
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const categories: Category[] = await getData(`/api/categories/`)

    const user = await getUser()

    return (
        <html lang='en'>
            <body className={josefinSans.className}>
                <Header categories={categories} user={user} />
                {children}
                <Footer />
            </body>
        </html>
    )
}
