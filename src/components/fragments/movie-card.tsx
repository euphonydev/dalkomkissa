import { getImagePublicUrl } from '@/services/common'
import { StarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { MovieEntry } from '@/types/movie.types'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScrollArea } from '@/components/ui/scroll-area'
import { supabase } from '@/lib/supabase/clients/server-component-client'

export async function MovieCard({
  id,
  cover_url,
  title,
  average_score,
}: MovieEntry) {
  const t = useTranslations()
  const cover = await getImagePublicUrl(supabase, 'cover', cover_url!)

  return (
    <Link
      href={`/`}
      className="w-full"
      key={id}
    >
      <div className="group flex flex-col space-y-1">
        <div className="relative w-full overflow-hidden rounded-md hover:ring-2 hover:ring-primary">
          <AspectRatio ratio={7 / 10}>
            <Image
              src={cover}
              alt={title!}
              width={182}
              height={160}
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
          <div className="absolute inset-0 flex rounded-md bg-black bg-opacity-50 p-2 text-white opacity-0 backdrop-blur-xs transition-opacity duration-300 hover:opacity-100">
            <div className="flex flex-col justify-between">
              <ScrollArea className="h-full">{title}</ScrollArea>
              <div className="flex w-full justify-between">
                <div className="text-alt flex items-center">
                  <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
                  {average_score || t('not_rated')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-small md:text-regular group-hover:text-link truncate">
            {title}
          </div>
        </div>
      </div>
    </Link>
  )
}

MovieCard.displayName = 'MovieCard'

export default MovieCard
