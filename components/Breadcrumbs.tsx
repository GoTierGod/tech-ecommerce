import Link from 'next/link'
import style from './breadcrumbs.module.css'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'

interface BreadcrumbsProps {
    routeList: string[]
}

export default function Breadcrumbs({ routeList }: BreadcrumbsProps) {
    return (
        <section className={style.breadcrumbs}>
            <div className={style.breadcrumbs}>
                <Link href='/'>Home</Link>
                {routeList.map((route, idx) => {
                    if (idx === routeList.length - 1)
                        return (
                            <span>
                                {titleCaseFormatter(route.replace(/\//g, ''))}
                            </span>
                        )
                    else
                        return (
                            <Link href={route}>
                                {titleCaseFormatter(route.replace(/\//g, ''))}
                            </Link>
                        )
                })}
            </div>
        </section>
    )
}
