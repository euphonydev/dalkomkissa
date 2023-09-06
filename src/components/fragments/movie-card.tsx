import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { StarIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import '@/lib/utils/number/shorten-format-number'

type MovieCardProps = {
    id: string,
    src: string,
    title: string,
    rating?: number,
    watchCount?: number
}

export const MovieCard = ({ id, src, title, rating, watchCount }: MovieCardProps) => {
    return (
        <Link href={`/movies/${id}`} className="w-full">
            <div className="flex flex-col space-y-1 group">
                <div className="relative w-full overflow-hidden rounded-md hover:ring-primary hover:ring-2">
                    <AspectRatio ratio={7 / 10}>
                        <Image src={src} alt={title} width={182} height={160} className="object-cover w-full h-full rounded-md" />
                    </AspectRatio>
                    <div className="absolute inset-0 flex p-2 text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded-md opacity-0 backdrop-blur-xs hover:opacity-100">
                        <div className="flex flex-col justify-between">
                            <ScrollArea className="h-full text-white">{title}</ScrollArea>
                            <div className="flex justify-between w-full">
                                <div className="flex items-center font-bold text-small">
                                    <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
                                    {rating ? rating : "0.0"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold truncate text-md md:text-large group-hover:text-link">{title}</div>
                    <div className="flex justify-between w-full">
                        <div className="text-small">
                            {watchCount ? watchCount.shortenFormatNumber() + " watched" : "0 watched"}
                        </div>
                    </div>
                </div>
            </div >
        </Link >
    )
}

MovieCard.displayName = "MovieCard"

export default MovieCard