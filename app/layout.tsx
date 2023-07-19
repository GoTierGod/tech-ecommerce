import Footer from '@/components/Footer'
import './globals.css'
import { Josefin_Sans } from 'next/font/google'
import Header from '@/components/Header'
import { Category } from '@/types/tables'
import { getData } from '@/helpers/getData'
import { getUser } from '@/helpers/getUser'
import { UserData } from '@/types/users'
import { refreshTokens } from '@/helpers/refreshTokens'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
    title: 'Home | Tech',
    description: 'The best products in technology'
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const categories: Category[] = await getData(
        `https://ft-drf-api.vercel.app/api/categories`
    )

    let user = await getUser()

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
