import axios from "axios"
import { Movie, Show } from "@/types"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { getGenreFromId } from "@/utils/getGenreFromId"
import Results from "@/components/Results"
import { useEffect } from "react"

interface GenrePageProps {
  movies: { results: Movie[] }
  shows: { results: Show[] }
}

function GenrePage({ movies, shows }: GenrePageProps) {
  const router = useRouter()

  const genreResult = [...movies.results, ...shows.results].sort(
    (a, b) => b.popularity - a.popularity
  )

  console.log(genreResult)

  useEffect(() => {
    if (!movies.results || !shows.results) router.push("/")
  }, [movies, shows, router])

  return (
    <>
      <p className="pb-4 text-center">
        Browse
        <span className="font-bold text-red-700">
          {" "}
          {getGenreFromId(Number(router.query.id))}{" "}
        </span>
        genre:
      </p>
      <Results data={genreResult} />
    </>
  )
}

export default GenrePage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const [moviesRes, showsRes] = await Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genre=${context.params?.id}`
    ),
    axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&page=1&with_genres=${context.params?.id}`
    ),
  ])
  const [movies, shows] = await Promise.all([moviesRes.data, showsRes.data])
  return {
    props: {
      movies,
      shows,
    },
  }
}
