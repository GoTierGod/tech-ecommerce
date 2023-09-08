'use client'

import style from './product-images.module.css'

import Image from 'next/image'
import { useState } from 'react'

import { ProductImage } from '@/types/tables'

interface ProductImagesProps {
    images: ProductImage[]
}

export default function ProductImages({ images }: ProductImagesProps) {
    const [currentImg, setCurrentImg] = useState(
        images.find(image => image.is_default) || images[0]
    )

    return (
        <div className={style.images}>
            <Image
                className={style.currImg}
                src={currentImg.url}
                alt={currentImg.description}
                width={450}
                height={450}
                quality='100'
                priority
            />
            <div className={style.imgList}>
                {images.map(image => (
                    <Image
                        key={image.id}
                        src={image.url}
                        alt={image.description}
                        height={48}
                        width={48}
                        quality='100'
                        onMouseOver={() => setCurrentImg(image)}
                        style={{
                            borderColor:
                                currentImg.id === image.id
                                    ? 'var(--main)'
                                    : 'var(--light-main)'
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
