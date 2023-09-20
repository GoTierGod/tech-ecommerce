import Link from 'next/link'
import style from './breadcrumbs.module.css'

interface BreadcrumbsProps {
    routeList: { path: string; name: string }[]
}

export default function Breadcrumbs({ routeList }: BreadcrumbsProps) {
    return (
        <section className={style.breadcrumbs}>
            <div className={style.breadcrumbs}>
                <Link href='/' prefetch={false}>
                    Home
                </Link>
                {routeList.map((route, idx) => {
                    if (idx === routeList.length - 1)
                        return <span key={route.name + idx}>{route.name}</span>
                    else
                        return (
                            <Link key={route.name + idx} href={route.path}>
                                {route.name}
                            </Link>
                        )
                })}
            </div>
        </section>
    )
}
