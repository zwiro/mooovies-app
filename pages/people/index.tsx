import axios from "axios"
import { FetchedDataPeople } from "@/types"
import Results from "@/components/Results"

interface PeoplePageProps {
  people: FetchedDataPeople
}

function PeoplePage({ people }: PeoplePageProps) {
  return (
    <>
      <p className="pb-4 text-center tracking-widest">
        POPULAR
        <span className="font-bold text-red-700"> PEOPLE</span>:
      </p>
      <Results data={people.results} />
    </>
  )
}

export default PeoplePage

export async function getServerSideProps() {
  const peopleRes = await axios.get(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  )
  const people = await peopleRes?.data
  return {
    props: {
      people,
    },
  }
}
