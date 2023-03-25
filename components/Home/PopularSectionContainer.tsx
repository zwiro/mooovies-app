import { DataTypes } from "@/types"
import { useState } from "react"
import CardDetails from "../CardDetails"
import PopularSection from "./PopularSection"

function PopularSectionContainer({ movies, shows, people }: DataTypes) {
  const [openedCardId, setOpenedCardId] = useState<number | null>(null)

  const openCard = (cardId: number) => {
    setOpenedCardId(cardId)
  }

  return (
    <>
      <PopularSection
        data={movies}
        title="Popular Movies"
        openCard={openCard}
      />
      <PopularSection data={shows} title="Popular Shows" openCard={openCard} />
      <PopularSection
        data={people}
        title="Popular People"
        openCard={openCard}
      />
      {openedCardId && <CardDetails openedCardId={openedCardId} />}
    </>
  )
}

export default PopularSectionContainer
