import { DataTypes } from "@/types"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import CardDetails from "../CardDetails"
import PopularSection from "./PopularSection"

function PopularSectionContainer({ movies, shows, people }: DataTypes) {
  const [openedCardId, setOpenedCardId] = useState<number | null>(null)

  const toggleCard = (cardId: number | null) => {
    setOpenedCardId(cardId)
  }

  const concatenatedData = [
    ...movies.results,
    ...shows.results,
    ...people.results,
  ]

  return (
    <>
      <PopularSection
        data={movies}
        title="Popular Movies"
        toggleCard={toggleCard}
      />
      <PopularSection
        data={shows}
        title="Popular Shows"
        toggleCard={toggleCard}
      />
      <PopularSection
        data={people}
        title="Popular People"
        toggleCard={toggleCard}
      />
      <AnimatePresence>
        {openedCardId && (
          <CardDetails
            card={concatenatedData.find((data) => data.id === openedCardId)!}
            toggleCard={toggleCard}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default PopularSectionContainer
