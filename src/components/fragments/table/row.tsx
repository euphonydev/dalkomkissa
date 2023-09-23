import { useTranslations } from "next-intl"

type TableRowDataProps = {
    label: string,
    textHighlight?: boolean,
    textHighlightTrigger?: string,
}

export function TableRowData({ label, textHighlight, textHighlightTrigger }: TableRowDataProps) {
    const t = useTranslations()
    return (
        <>
            {textHighlight ? (
                <span className={label === textHighlightTrigger ? 'text-primary' : 'opacity-80'}>{t(label.toUpperCase())}</span>
            ) : t(label.toUpperCase())}
        </>
    )
}