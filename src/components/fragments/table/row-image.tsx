'use client'

import { useState, useEffect } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

export const TableRowImage = ({ src, alt, ratio, width, height }: { src: string, alt: string, ratio: number, width: number, height: number }) => {
    const [publicUrl, setPublicUrl] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPublicUrl() {
            const supabase = createClientComponentClient();
            const { data } = await supabase.storage.from('avatar').getPublicUrl(src);
            setPublicUrl(data.publicUrl);
        }

        fetchPublicUrl()
    }, [src])

    if (!publicUrl) {
        return <div>Loading...</div>
    }

    return (
        <AspectRatio ratio={ratio}>
            <Image src={publicUrl} alt={alt} width={width} height={height} className="object-cover w-full h-full rounded-md" />
        </AspectRatio>
    )
}