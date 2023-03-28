import { useState } from "react"

function useExpand(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState)

  function expand() {
    setIsExpanded((prevState) => !prevState)
  }

  return {
    isExpanded,
    expand,
  }
}

export default useExpand
