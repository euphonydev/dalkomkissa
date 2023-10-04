import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { StarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { MovieEntry } from '@/types/movies'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Database } from '@/lib/database.types'
import '@/lib/utils/number/shorten-format-number'

export async function MovieCard({
  id,
  cover_url,
  title,
  average_score,
  watch_count,
}: MovieEntry) {
  const t = useTranslations()
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  const { data: cover } = await supabase.storage
    .from('cover')
    .getPublicUrl(cover_url!)

  return (
    <Link
      href={`/movies/${id}`}
      className="w-full"
    >
      <div className="group flex flex-col space-y-1">
        <div className="relative w-full overflow-hidden rounded-md hover:ring-2 hover:ring-primary">
          <AspectRatio ratio={7 / 10}>
            <Image
              src={cover.publicUrl}
              alt={title!}
              width={182}
              height={160}
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
          <div className="absolute inset-0 flex rounded-md bg-black bg-opacity-50 p-2 text-white opacity-0 backdrop-blur-xs transition-opacity duration-300 hover:opacity-100">
            <div className="flex flex-col justify-between">
              <ScrollArea className="h-full text-white">{title}</ScrollArea>
              <div className="flex w-full justify-between">
                <div className="text-small flex items-center font-bold">
                  <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
                  {average_score || '0.0'}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-md md:text-large group-hover:text-link truncate font-semibold">
            {title}
          </div>
          <div className="flex w-full justify-between">
            <div className="text-small">
              {watch_count.shortenFormatNumber() + t('WATCHED')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

MovieCard.displayName = 'MovieCard'

export default MovieCard
