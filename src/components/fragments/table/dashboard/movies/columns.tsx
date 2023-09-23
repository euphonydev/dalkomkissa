'use client'

import { Movies } from "@/types/movies";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { ArrowUpDownIcon, MoreVerticalIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Movies>[] = [
    {
        accessorKey: "thumb",
        header: () => {
            const t = useTranslations()
            return (
                <>{t('COVER')}</>
            )
        },
        cell: ({ row }) => {
            const supabase = createClientComponentClient()
            const { data } = supabase.storage.from('avatar').getPublicUrl(row.getValue('thumb'));
            return (
                <AspectRatio ratio={7 / 10}>
                    <Image src={data.publicUrl} alt={row.getValue('title')} width={112} height={160} className="object-cover w-full h-full rounded-md" />
                </AspectRatio>
            )
        },
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            const t = useTranslations()
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t('TITLE')}
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "format",
        header: () => {
            const t = useTranslations()
            return (
                <>{t('FORMAT')}</>
            )
        },
        cell: ({ row }) => {
            const t = useTranslations()
            const format: String = row.getValue('format')
            return t(format.toUpperCase())
        },
    },
    {
        accessorKey: "published",
        header: () => {
            const t = useTranslations()
            return (
                <>{t('STATUS')}</>
            )
        },
        cell: ({ row }) => {
            const t = useTranslations()
            const published: String = row.getValue('published')
            return <span className={published === 'published' ? 'text-primary' : 'opacity-80'}>{t(published.toUpperCase())}</span>
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const t = useTranslations()
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>{t('EDIT')}</DropdownMenuItem>
                        <DropdownMenuItem>{t('PUBLISH_NOW')}</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]

export default columns