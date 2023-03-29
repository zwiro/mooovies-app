import { useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useInfiniteQuery } from "react-query"
import { Movie, Person, Show } from "@/types"

function useInfiniteScroll(
  initialState: Movie[] | Person[] | Show[],
  apiUrl: string,
  criteria: { query?: string; filters?: string[]; sortBy?: string }
) {
  const [allData, setAllData] = useState(initialState)
  const { query, filters, sortBy } = criteria

  const ref = useRef(null)
  const isInView = useInView(ref)

  const fetchMoreData = async (page: number) => {
    const dataRes = await axios.get(
      `/api/${apiUrl}?page=${page}&genres=${filters}&sort=${sortBy}&query=${query}`
    )
    const response = await dataRes.data
    if (page > 1) {
      setAllData((prevData) => [...prevData, ...response.results])
    } else {
      setAllData(response.results)
    }
  }

  const { isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [apiUrl, { filters }, { sortBy }],
      queryFn: ({ pageParam = 1 }) => fetchMoreData(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allData.length < 20 ? undefined : allPages.length + 1
        return nextPage
      },
    })

  useEffect(() => {
    fetchNextPage()
  }, [isInView, fetchNextPage])

  return {
    isLoading,
    isError,
    allData,
    isFetchingNextPage,
    ref,
  }
}

export default useInfiniteScroll
