import axios from "axios"
import { FetchedDataPeople } from "@/types"
import Results from "@/components/Results"
import { useInfiniteQuery } from "react-query"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import LoadingSpinner from "@/components/LoadingSpinner"

interface PeoplePageProps {
  people: FetchedDataPeople
}

function PeoplePage({ people }: PeoplePageProps) {
  console.log(people.results)
  const [allPeople, setAllPeople] = useState(people.results)

  const ref = useRef(null)
  const isInView = useInView(ref)

  const fetchMoreData = async (page: number) => {
    const peopleRes = await axios.get(`/api/people?page=${page}`)
    const people = await peopleRes.data
    if (page > 1) {
      setAllPeople((prevPeople) => [...prevPeople, ...people.results])
    } else {
      setAllPeople(people.results)
    }
  }

  const { isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["people"],
      queryFn: ({ pageParam = 1 }) => fetchMoreData(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPeople.length < 20 ? undefined : allPages.length + 1
        return nextPage
      },
    })

  useEffect(() => {
    fetchNextPage()
  }, [isInView, fetchNextPage])

  return (
    <>
      <p className="pb-4 text-center tracking-widest">
        POPULAR
        <span className="font-bold text-red-700"> PEOPLE</span>:
      </p>
      {isLoading && (
        <div className="absolute inset-x-0 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isError && <div className="text-center">Error while loading data</div>}
      {allPeople.length ? (
        <Results data={allPeople} />
      ) : (
        <p className="text-center">No people found</p>
      )}
      {allPeople.length ? <div ref={ref} /> : ""}

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  )
}

export default PeoplePage

export async function getStaticProps() {
  const peopleRes = await axios.get(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  )
  const people = await peopleRes?.data
  return {
    props: {
      people,
    },
    revalidate: 21600,
  }
}
