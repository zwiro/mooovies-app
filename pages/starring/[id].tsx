import axios from "axios"
import { Movie, Person, Show } from "@/types"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { getGenreFromId } from "@/utils/getGenreFromId"
import Results from "@/components/Results"
import { useEffect } from "react"

interface StarringPageProps {
  genreResult: { results: (Movie | Show | Person)[] }
}

function StarringPage({ genreResult }: StarringPageProps) {
  const router = useRouter()

  useEffect(() => {
    if (!genreResult.results.length) router.push("/")
  }, [genreResult, router])

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

export default StarringPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const genreResultRes =
    context.params &&
    (await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${context.params.id}&with_watch_monetization_types=flatrate`
    ))
  const genreResult = await genreResultRes?.data
  return {
    props: {
      genreResult,
    },
  }
}
