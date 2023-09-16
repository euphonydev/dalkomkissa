import { redirect } from 'next/navigation'

export default function Home() {
  return redirect('/discover/movies/latest')
}
