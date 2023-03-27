import axios from "axios"
import { FetchedDataShows } from "@/types"
import Results from "@/components/Results"

interface ShowsPageProps {
  shows: FetchedDataShows
}

function ShowsPage({ shows }: ShowsPageProps) {
  return (
    <>
      <p className="pb-4 text-center tracking-widest">
        POPULAR
        <span className="font-bold text-red-700"> SHOWS</span>:
      </p>
      <Results data={shows.results} />
    </>
  )
}

export default ShowsPage

export async function getServerSideProps() {
  const showsRes = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  )
  const shows = await showsRes?.data
  return {
    props: {
      shows,
    },
  }
}
