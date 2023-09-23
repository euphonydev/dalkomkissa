import type { Movies } from '@/types/movies';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function getMoviesByLang(
  lang: string,
  limit: number | undefined = undefined,
): Promise<Movies[]> {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const { data } = await supabase
    .rpc('get_movie_list', {
      lang_param: lang,
      limit_param: limit,
    })
    .select('*');
  if (data) {
    return data;
  } else {
    return [];
  }
}
