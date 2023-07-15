import Footer from '@/components/Footer'
import './globals.css'
import { Josefin_Sans } from 'next/font/google'
import Header from '@/components/Header'
import { Category } from '@/types/tables'
import { getData } from '@/helpers/getData'
import { AuthProvider } from '@/context/AuthContext'

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

    return (
        <html lang='en'>
            <AuthProvider>
                <body className={josefinSans.className}>
                    <Header categories={categories} />
                    {children}
                    <Footer />
                </body>
            </AuthProvider>
        </html>
    )
}
