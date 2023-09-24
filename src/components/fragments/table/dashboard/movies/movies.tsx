import { DataTable } from "@/components/fragments/table/dashboard/data-table"
import columns from "@/components/fragments/table/dashboard/movies/columns"
import { getMoviesByLang } from "@/functions/movies"

export async function MovieTable() {
    const data = await getMoviesByLang('default')
    return (
        <div className="py-10">
            <DataTable columns={columns} data={data} searchColumn="title" searchPlaceholder="movie" newEntryLink="/" />
        </div>
    )

}

MovieTable.displayName = "MovieTable"

export default MovieTable