import { getMoviesByLang } from '@/functions/movies'
import { DataTable } from '@/components/fragments/table/dashboard/data-table'
import { columns } from '@/components/fragments/table/dashboard/movies/columns'

export async function MovieTable() {
  const data = await getMoviesByLang('default')
  return (
    <div className="py-10">
      <DataTable
        columns={columns}
        data={data}
        searchColumn="title"
        searchPlaceholder="movie"
        newEntryLink="/movie/new"
      />
    </div>
  )
}

MovieTable.displayName = 'MovieTable'

export default MovieTable
