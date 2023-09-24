"use client"

import { useState } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getPaginationRowModel,
    getFilteredRowModel,
    ColumnFiltersState
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    searchColumn: string,
    searchPlaceholder?: string,
    newEntryLink?: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchColumn,
    searchPlaceholder = searchColumn,
    newEntryLink
}: DataTableProps<TData, TValue>) {
    const t = useTranslations()
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters
        }
    })

    return (
        <div className="w-full">
            {searchColumn ? (
                <div className="flex items-center py-4 justify-between">
                    <Input
                        placeholder={t('SEARCH_FIELD', { field: t(searchPlaceholder.toUpperCase()).toLowerCase() })}
                        value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    {newEntryLink ? (
                        <Link href={newEntryLink}>
                            <Button>
                                <PlusIcon className="h-4 w-4 md:mr-2" />
                                    <span className="hidden md:inline">
                                        {t('ADD_NEW_ENTRY', { entry: t(searchPlaceholder.toUpperCase()).toLowerCase() })}
                                    </span>
                            </Button>
                        </Link>
                    ) : null}
                </div>
            ) : null}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
