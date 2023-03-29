import useExpand from "@/hooks/useExpand"
import { SortOptions } from "@/types"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"

const options = [
  {
    name: "Popularity",
    value: SortOptions.popularityDesc,
  },
  {
    name: "Popularity",
    value: SortOptions.popularityAsc,
  },
  {
    name: "Release date",
    value: SortOptions.releaseDateDesc,
  },
  {
    name: "Release date",
    value: SortOptions.releaseDateAsc,
  },
  {
    name: "Revenue",
    value: SortOptions.revenueDesc,
  },
  {
    name: "Revenue",
    value: SortOptions.revenueAsc,
  },
]

interface SortingProps {
  sort: (option: SortOptions) => void
  sortBy: SortOptions
}

function Sorting({ sort, sortBy }: SortingProps) {
  const { isExpanded, expand } = useExpand()

  const sortingAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: {
      opacity: 0,
    },
  }

  return (
    <div onClick={expand} className="relative">
      <div className="group flex cursor-pointer items-center gap-1">
        <p className="group-hover:text-red-700 xl:text-xl">Sort</p>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform ${
            isExpanded && "rotate-180"
          }`}
        />
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            {...sortingAnimation}
            className="absolute -left-16 z-50 rounded bg-black/20 backdrop-blur"
          >
            {options.map((option, i) => (
              <li
                key={i}
                onClick={() => sort(option.value)}
                className={`flex cursor-pointer items-center justify-end gap-1 p-1 text-sm hover:text-red-700 xl:p-2 ${
                  sortBy === option.value && "text-red-700"
                } `}
              >
                {option.name}{" "}
                <ChevronDownIcon
                  className={`h-4 w-4 ${i % 2 && "rotate-180"} `}
                />{" "}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Sorting
