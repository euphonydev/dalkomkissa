'use client'

import { TableRowBadge } from '../../row-badge'
import { ColumnDef } from '@tanstack/react-table'
import { MovieEntry } from '@/types/movie.types'
import { TableHeaderData } from '@/components/fragments/table/header'
import { TableRowData } from '@/components/fragments/table/row'
import { TableRowAction } from '@/components/fragments/table/row-action'
import { TableRowImage } from '@/components/fragments/table/row-image'

const actionMenuItem = [
  {
    label: 'edit',
    link: '/dashboard/movies',
  },
  {
    label: 'publish_now',
    link: '/dashboard/movies',
  },
]

export const columns: ColumnDef<MovieEntry>[] = [
  {
    accessorKey: 'cover_url',
    header: () => <TableHeaderData label="cover" />,
    cell: ({ row }) => (
      <TableRowImage
        src={row.getValue('cover_url')}
        alt={row.getValue('title')}
        ratio={7 / 10}
        width={112}
        height={160}
        source="cover"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 64,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <TableHeaderData
        label="title"
        column={column}
      />
    ),
    cell: ({ row }) => {
      const airdate = new Date(row.original.original_airdate)
      const year = airdate.getFullYear()
      return (
        <>
          <div className="line-clamp-2">{`${row.original.title} (${year})`}</div>
          <div className="text-alt mt-2 line-clamp-3 hidden lg:line-clamp-4 lg:[display:-webkit-box]">
            {row.original.description}
          </div>
        </>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'format',
    header: () => <TableHeaderData label="format" />,
    cell: ({ row }) => (
      <TableRowData
        key="format"
        label={row.original.format}
      />
    ),
    size: 6,
  },
  {
    accessorKey: 'status',
    header: () => <TableHeaderData label="status" />,
    cell: ({ row }) => (
      <TableRowData
        key="status"
        label={row.original.status}
      />
    ),
    size: 6,
  },
  {
    accessorKey: 'published_at',
    header: () => <TableHeaderData label="published" />,
    cell: ({ row }) => {
      const publishedAt = row.original.published_at
        ? new Date(row.original.published_at)
        : null
      const now = new Date()
      return (
        <TableRowBadge
          label={publishedAt && publishedAt < now ? 'published' : 'draft'}
          variant={publishedAt && publishedAt < now ? 'default' : 'outline'}
          useTranslation
        />
      )
    },
    size: 6,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => <TableRowAction menuItem={actionMenuItem} />,
    size: 2,
  },
]

export default columns
