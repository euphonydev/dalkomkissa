import { StarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScrollArea } from '@/components/ui/scroll-area'
import '@/lib/utils/number/shorten-format-number'

type MovieCardProps = {
  id: string
  src: string
  title: string
  rating?: number
  watchCount?: number
}

export function MovieCard({
  id,
  src,
  title,
  rating,
  watchCount,
}: MovieCardProps) {
  const t = useTranslations()

  return (
    <Link
      href={`/movies/${id}`}
      className="w-full"
    >
      <div className="group flex flex-col space-y-1">
        <div className="relative w-full overflow-hidden rounded-md hover:ring-2 hover:ring-primary">
          <AspectRatio ratio={7 / 10}>
            <Image
              src={src}
              alt={title}
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
                  {rating || '0.0'}
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
              {watchCount
                ? watchCount.shortenFormatNumber() + t('WATCHED')
                : `0${t('WATCHED')}`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

MovieCard.displayName = 'MovieCard'

export default MovieCard
