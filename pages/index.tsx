import PopularMovies from "@/components/Home/PopularMovies"
import PopularPeople from "@/components/Home/PopularPeople"
import PopularShows from "@/components/Home/PopularShows"
import { FetchedDataMovies, FetchedDataPeople, FetchedDataShows } from "@/types"
import axios from "axios"
import Head from "next/head"

interface HomeProps {
  movies: FetchedDataMovies
  shows: FetchedDataShows
  people: FetchedDataPeople
}

export default function Home({ movies, shows, people }: HomeProps) {
  return (
    <>
      <Head>
        <title>Mooovies</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Mooovies</h1>
      <PopularMovies movies={movies} />
      <PopularShows shows={shows} />
      <PopularPeople people={people} />
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
