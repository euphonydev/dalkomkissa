import { useTranslations } from "next-intl"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVerticalIcon } from "lucide-react"

type TableRowActionProps = {
    menuItem: {
        label: string,
        link?: string
    }[],
}

export function TableRowAction({ menuItem }: TableRowActionProps) {
    const t = useTranslations()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVerticalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {menuItem.map(({ label, link }) => (
                    <DropdownMenuItem>{t(label.toUpperCase())}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}