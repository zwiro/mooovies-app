import { SortOptions } from "@/types"
import { useState } from "react"

function useSort() {
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.popularityDesc)

  const sort = (option: SortOptions) => {
    setSortBy(option)
  }

  return { sortBy, sort }
}

export default useSort
