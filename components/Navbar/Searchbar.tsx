import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import { useState } from "react"

function Searchbar() {
  const [searchInput, setSearchInput] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search/${searchInput}`)
  }

  return (
    <div className="relative ml-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for..."
          className="w-full rounded-full py-1 px-2"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      <MagnifyingGlassIcon className="absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2" />
    </div>
  )
}

export default Searchbar
