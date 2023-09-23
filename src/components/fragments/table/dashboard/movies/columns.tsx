'use client'

import { Movies } from "@/types/movies";
import { ColumnDef } from "@tanstack/react-table";
import { TableHeaderData } from "@/components/fragments/table/header"
import { TableRowData } from "@/components/fragments/table/row"
import { TableRowImage } from '@/components/fragments/table/row-image'
import { TableRowAction } from '@/components/fragments/table/row-action'

const actionMenuItem = [
    {
        label: "edit",
    },
    {
        label: "publish_now",
    }
]

export const columns: ColumnDef<Movies>[] = [
    {
        accessorKey: "thumb",
        header: () => <TableHeaderData label="cover" />,
        cell: ({ row }) => <TableRowImage src={row.getValue("thumb")} alt={row.getValue("title")} ratio={7 / 10} width={112} height={160} />,
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "title",
        header: ({ column }) => <TableHeaderData label="title" column={column} />,
    },
    {
        accessorKey: "format",
        header: () => <TableHeaderData label="format" />,
        cell: ({ row }) => <TableRowData key="format" label={row.getValue("format")} />,
    },
    {
        accessorKey: "published",
        header: () => <TableHeaderData label="status" />,
        cell: ({ row }) => <TableRowData label={row.getValue("published")} textHighlightTrigger="published" textHighlight />,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: () => <TableRowAction menuItem={actionMenuItem} />
    }
]

export default columns