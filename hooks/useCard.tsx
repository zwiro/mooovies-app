import { useState } from "react"

function useCard(initialState = null) {
  const [openedCardId, setOpenedCardId] = useState<number | null>(initialState)

  const toggleCard = (cardId: number | null) => {
    setOpenedCardId(cardId)
  }

  return {
    openedCardId,
    toggleCard,
  }
}

export default useCard
