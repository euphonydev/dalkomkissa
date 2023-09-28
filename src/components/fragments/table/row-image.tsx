'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export function TableRowImage({
  src,
  alt,
  ratio,
  width,
  height,
}: {
  src: string
  alt: string
  ratio: number
  width: number
  height: number
}) {
  const [publicUrl, setPublicUrl] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPublicUrl() {
      const supabase = createClientComponentClient()
      const { data } = await supabase.storage.from('avatar').getPublicUrl(src)
      setPublicUrl(data.publicUrl)
    }

    fetchPublicUrl()
  }, [src])

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
