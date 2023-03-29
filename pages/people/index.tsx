import axios from "axios"
import { FetchedDataPeople } from "@/types"
import Results from "@/components/Results"
import { useInfiniteQuery } from "react-query"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import LoadingSpinner from "@/components/LoadingSpinner"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import Head from "next/head"

interface PeoplePageProps {
  people: FetchedDataPeople
}

function PeoplePage({ people }: PeoplePageProps) {
  const { isLoading, isError, allData, isFetchingNextPage, ref } =
    useInfiniteScroll(people.results, "people", {})

  return (
    <>
      <Head>
        <title>Mooovies | People</title>
      </Head>
      <p className="pb-4 text-center tracking-widest lg:text-2xl">
        POPULAR
        <span className="font-bold text-red-700"> PEOPLE</span>:
      </p>
      {isLoading && (
        <div className="absolute inset-x-0 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isError && <div className="text-center">Error while loading data</div>}
      {allData.length ? (
        <Results data={allData} />
      ) : (
        <p className="text-center">No people found</p>
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
