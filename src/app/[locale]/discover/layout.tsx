import { Navbar } from "@/components/templates/navbar"

export default function MoviesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Navbar>
            {children}
        </Navbar>
    )
}
