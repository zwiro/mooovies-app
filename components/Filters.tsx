import { Genre, GenresTypes } from "@/types"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface FiltersProps {
  addFilter: (e: React.MouseEvent) => void
  filters: string[]
  genres: GenresTypes
}

function Filters({ addFilter, filters, genres }: FiltersProps) {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)

  const filtersAnimation = {
    initial: { height: 0, opacity: 0, padding: 0 },
    animate: { height: "auto", opacity: 1, padding: "auto" },
    exit: {
      height: 0,
      opacity: 0,
      padding: 0,
      transition: { opacity: { duration: 0.2 } },
    },
  }

  return (
    <div className="flex flex-col pb-4">
      <div
        onClick={() => setIsFiltersExpanded((prevExpanded) => !prevExpanded)}
        className="flex cursor-pointer items-center gap-1"
      >
        <p>Filters</p>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform ${
            isFiltersExpanded && "rotate-180"
          }`}
        />
      </div>
      <AnimatePresence>
        {isFiltersExpanded && (
          <motion.div
            {...filtersAnimation}
            className="flex flex-wrap gap-2 pb-4"
            onClick={addFilter}
          >
            {genres.genres.map((genre: Genre) => (
              <motion.button
                whileTap={{ scale: 1.5 }}
                key={genre.id}
                className={`rounded border border-red-700 px-1 text-sm transition-colors hover:border-red-700 hover:bg-red-700 ${
                  filters.includes(genre.id.toString()) && "bg-red-700"
                }`}
                data-id={genre.id}
              >
                {genre.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Filters
