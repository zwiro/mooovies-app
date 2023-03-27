import useCard from "@/hooks/useCard"
import { isMovies, isPeople, Movie, Person, Show } from "@/types"
import { AnimatePresence } from "framer-motion"
import Card from "./Card"
import CardDetails from "./CardDetails"

interface ResultsProps {
  data: { results: (Movie | Show | Person)[] }
}

function Results({ data }: ResultsProps) {
  const { openedCardId, toggleCard } = useCard()

  return (
    <>
      <div className="grid grid-cols-fluid place-items-center gap-4">
        {data.results.map((result) => (
          <Card
            key={result.id}
            id={result.id}
            image={
              isPeople(result) ? result.profile_path : result.backdrop_path
            }
            title={isMovies(result) ? result.title : result.name}
            toggleCard={toggleCard}
          />
        ))}
      </div>
      <AnimatePresence>
        {openedCardId && (
          <CardDetails
            card={
              data.results.find(
                (data: Movie | Show | Person) => data.id === openedCardId
              )!
            }
            toggleCard={toggleCard}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Results