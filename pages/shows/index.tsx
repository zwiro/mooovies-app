import axios from "axios"
import { FetchedDataShows, GenresTypes, SortOptions } from "@/types"
import Results from "@/components/Results"
import { useEffect, useRef, useState } from "react"
import Filters from "@/components/Filters"
import { useInfiniteQuery } from "react-query"
import LoadingSpinner from "@/components/LoadingSpinner"
import Sorting from "@/components/Sorting"
import { useInView } from "framer-motion"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import useFilter from "@/hooks/useFilter"
import useSort from "@/hooks/useSort"
import Head from "next/head"

interface ShowsPageProps {
  shows: FetchedDataShows
  genres: GenresTypes
}

function ShowsPage({ shows, genres }: ShowsPageProps) {
  const { filters, addFilter } = useFilter()
  const { sortBy, sort } = useSort()

  const { isLoading, isError, allData, isFetchingNextPage, ref } =
    useInfiniteScroll(shows.results, "shows", {
      filters: filters,
      sortBy: sortBy,
    })

  return (
    <>
      <Head>
        <title>Mooovies | TV Shows</title>
      </Head>
      <p className="pb-4 text-center tracking-widest lg:text-2xl">
        <span>POPULAR</span>
        <span className="font-bold text-red-700"> SHOWS</span>:
      </p>
      <div className="flex justify-between">
        <Filters addFilter={addFilter} filters={filters} genres={genres} />
        <Sorting sort={sort} sortBy={sortBy} />
      </div>
      {isLoading && (
        <div className="absolute inset-x-0 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isError && <div className="text-center">Error while loading data</div>}
      {allData.length ? (
        <Results data={allData} />
      ) : (
        <p className="text-center">No shows found with chosen genres</p>
      )}
      {allData.length ? <div ref={ref} /> : ""}
      {isFetchingNextPage && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  )
}

export default ShowsPage

export async function getStaticProps() {
  const [showsRes, genresRes] = await Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
    axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    ),
  ])

  const [shows, genres] = await Promise.all([showsRes.data, genresRes.data])
  return {
    props: {
      shows,
      genres,
    },
    revalidate: 21600,
  }
}
