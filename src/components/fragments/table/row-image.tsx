'use client'

import { getImagePublicUrl } from '@/services/common'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { supabase } from '@/lib/supabase/clients/client-component-client'

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
      const cover = await getImagePublicUrl(supabase, 'cover', src)
      setPublicUrl(cover)
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
