'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'

type TableRowImageProps = {
  src: string
  alt: string
  ratio: number
  width: number
  height: number
  source?: string
}

export function TableRowImage({
  src,
  alt,
  ratio,
  width,
  height,
  source = 'image',
}: TableRowImageProps) {
  const [publicUrl, setPublicUrl] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPublicUrl() {
      const supabase = createClientComponentClient()
      const { data } = await supabase.storage.from(source).getPublicUrl(src)
      setPublicUrl(data.publicUrl)
    }

    fetchPublicUrl()
  }, [src, source])

  if (!publicUrl) {
    return <div>Loading...</div>
  }

  return (
    <AspectRatio ratio={ratio}>
      <Image
        src={publicUrl}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
  )
}
