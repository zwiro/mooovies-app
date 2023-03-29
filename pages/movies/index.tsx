import axios from "axios"
import { FetchedDataMovies, GenresTypes, SortOptions } from "@/types"
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

interface MoviesPageProps {
  movies: FetchedDataMovies
  genres: GenresTypes
}

function MoviesPage({ movies, genres }: MoviesPageProps) {
  const { filters, addFilter } = useFilter()
  const { sortBy, sort } = useSort()

  const { isLoading, isError, allData, isFetchingNextPage, ref } =
    useInfiniteScroll(movies.results, "movies", {
      filters: filters,
      sortBy: sortBy,
    })

  return (
    <>
      <Head>
        <title>Mooovies | Movies</title>
      </Head>
      <p className="pb-4 text-center tracking-widest lg:text-2xl">
        <span>POPULAR</span>
        <span className="font-bold text-red-700"> MOVIES</span>:
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
        <p className="text-center">No movies found with chosen genres</p>
      )}
      {allData.length && <div ref={ref} />}
      {isFetchingNextPage && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  )
}

export default MoviesPage

export async function getStaticProps() {
  const [moviesRes, genresRes] = await Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
    axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    ),
  ])

  const [movies, genres] = await Promise.all([moviesRes.data, genresRes.data])
  return {
    props: {
      movies,
      genres,
    },
    revalidate: 21600,
  }
}
