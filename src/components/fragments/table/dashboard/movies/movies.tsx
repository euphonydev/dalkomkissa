import { getMoviesByLang } from '@/services/movie'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DataTable } from '@/components/fragments/table/dashboard/data-table'
import { columns } from '@/components/fragments/table/dashboard/movies/columns'

export async function MovieTable() {
  const supabase = createServerComponentClient({
    cookies,
  })
  const data = await getMoviesByLang(supabase, 'en')
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
