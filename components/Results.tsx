import { AnimatePresence } from "framer-motion"
import { isMovies, isPeople, Movie, Person, Show } from "@/types"
import useCard from "@/hooks/useCard"
import Card from "./Card"
import CardDetails from "./CardDetails"

interface ResultsProps {
  data: (Movie | Show | Person)[]
  isProfile?: boolean
}

function Results({ data, isProfile }: ResultsProps) {
  const { openedCardId, toggleCard } = useCard()

  return (
    <>
      <div className="grid grid-cols-fluid gap-4 lg:gap-8">
        {data.map((result) => (
          <Card
            key={result.id}
            id={result.id}
            image={
              isPeople(result) ? result.profile_path : result.backdrop_path
            }
            title={isMovies(result) ? result.title : result.name}
            toggleCard={toggleCard}
            isPeople={isPeople(result)}
          />
        ))}
      </div>
      <AnimatePresence>
        {openedCardId && (
          <CardDetails
            card={
              data.find(
                (data: Movie | Show | Person) => data.id === openedCardId
              )!
            }
            toggleCard={toggleCard}
            isProfile={isProfile}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Results
