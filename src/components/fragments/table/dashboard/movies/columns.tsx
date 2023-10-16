'use client'

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
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <TableHeaderData
        label="title"
        column={column}
      />
    ),
  },
  {
    accessorKey: 'type',
    header: () => <TableHeaderData label="format" />,
    cell: ({ row }) => (
      <TableRowData
        key="type"
        label={row.getValue('type')}
      />
    ),
  },
  {
    accessorKey: 'published',
    header: () => <TableHeaderData label="status" />,
    cell: ({ row }) => (
      <TableRowData
        label={row.getValue('published') ? 'published' : 'draft'}
        textHighlightTrigger="published"
        textHighlight
      />
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => <TableRowAction menuItem={actionMenuItem} />,
  },
]

export default columns
