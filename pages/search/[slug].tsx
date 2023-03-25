import { useRouter } from "next/router"
import axios from "axios"

function SearchPage({ searchResult }) {
  console.log(searchResult)
  const router = useRouter()
  const { slug } = router.query
  console.log(router.query)
  return <div>{slug}</div>
}

export default SearchPage

export async function getServerSideProps(context) {
  console.log(context.params.slug)
  const searchResultRes = await axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${context.params.slug}&page=1&include_adult=false`
  )
  const searchResult = await searchResultRes.data
  return {
    props: {
      searchResult,
    },
  }
}
