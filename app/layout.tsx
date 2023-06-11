import './globals.css'
import { Josefin_Sans } from 'next/font/google'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
    title: 'All Tech | Home',
    description: 'The best products in technology'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={josefinSans.className}>{children}</body>
        </html>
    )
}
