import PopularSectionContainer from "@/components/Home/PopularSectionContainer"
import { DataTypes } from "@/types"
import axios from "axios"
import Head from "next/head"

export default function Home({ movies, shows, people }: DataTypes) {
  return (
    <>
      <Head>
        <title>Mooovies</title>
        <meta
          name="description"
          content="Browse movies, TV shows and actors."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <PopularSectionContainer movies={movies} shows={shows} people={people} />
    </>
  )
}

export async function getStaticProps() {
  const [moviesRes, showsRes, peopleRes] = await Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
    axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
    axios.get(
      ` https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
  ])

  const [movies, shows, people] = await Promise.all([
    moviesRes.data,
    showsRes.data,
    peopleRes.data,
  ])

  return {
    props: {
      movies,
      shows,
      people,
    },
    revalidate: 21600,
  }
}
