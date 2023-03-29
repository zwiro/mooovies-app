import axios, { AxiosError } from "axios"
import { Movie, Person, Show } from "@/types"
import { GetServerSidePropsContext } from "next"
import Results from "@/components/Results"
import Head from "next/head"

interface StarringPageProps {
  credits: { cast: (Movie | Show | Person)[] }
  person: Person
  error?: AxiosError
}

function StarringPage({ credits, person, error }: StarringPageProps) {
  if (error) {
    return <div className="text-center">Person not found</div>
  }

  return (
    <>
      <Head>
        <title>Mooovies | {person.name}</title>
      </Head>
      <p className="pb-4 text-center tracking-widest lg:text-2xl">
        MOVIES AND SHOWS WITH{" "}
        <span className="font-bold uppercase text-red-700">{person.name}</span>:
      </p>
      <Results
        data={credits.cast.sort((a, b) => b.popularity - a.popularity)}
      />
    </>
  )
}

export default StarringPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const [creditsRes, personRes] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/person/${context.params?.id}/combined_credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      ),
      axios.get(
        `https://api.themoviedb.org/3/person/${context.params?.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      ),
    ])
    const [credits, person] = await Promise.all([
      creditsRes.data,
      personRes.data,
    ])
    return {
      props: {
        credits,
        person,
      },
    }
  } catch (error: any) {
    return {
      props: { error: error.message },
    }
  }
}
