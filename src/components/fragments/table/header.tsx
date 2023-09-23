import { Button } from "@/components/ui/button"
import { ArrowUpDownIcon } from "lucide-react"
import { useTranslations } from "next-intl"

type TableHeaderDataProps = {
    label: string,
    column?: any,
}

export function TableHeaderData({ label, column }: TableHeaderDataProps) {
    const t = useTranslations()
    return (
        <>
            {column ? (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t(label.toUpperCase())}
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            ) : t(label.toUpperCase())}
        </>
    )
}