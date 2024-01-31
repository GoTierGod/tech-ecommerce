import './globals.css'

import { Josefin_Sans } from 'next/font/google'
import { Metadata } from 'next'

import { Category } from '@/types/tables'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'
import { getCustomer } from '@/utils/data/getCustomer'
import { API_URL } from '@/constants/api'
import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/dist/client/components/headers'
import { getData } from '@/utils/data/getData'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

const description = `This front-end application built with Next.js 13 and was 
seamlessly integrated with the Django REST Framework API. This synergy 
creates an easy-to-use graphical interface (GUI) that enhances the user 
experience and allows the user to fully explore all of the website's features.`

export const metadata: Metadata = {
    title: 'Tech',
    description: description,
    metadataBase: new URL('https://tech-ecommerce-ebon.vercel.app/'),
    creator: 'GoTierGod',
    publisher: 'GoTierGod',
    authors: {
        name: 'GoTierGod',
        url: 'https://tech-ecommerce-ebon.vercel.app/'
    },
    robots: 'index, follow',
    twitter: {
        title: 'Tech',
        description: description,
        images: ['/twitter-image.png']
    },
    openGraph: {
        title: 'Tech',
        description: description,
        images: ['/opengraph-image.png']
    }
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const categories: Category[] = await getData(`/api/categories/`)

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
