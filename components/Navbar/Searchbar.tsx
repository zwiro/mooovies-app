import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

function Searchbar() {
  return (
    <div className="relative ml-auto">
      <input
        type="text"
        placeholder="Search for..."
        className="rounded-full py-1 px-2"
      />
      <MagnifyingGlassIcon className="absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2" />
    </div>
  )
}

export default Searchbar
