import Image from "next/image"
import tmdb from "@/public/tmdb.svg"

function Footer() {
  return (
    <footer className="absolute bottom-0 flex w-full items-center justify-between border-t border-zinc-800 px-4 py-2">
      <p>
        moovies &copy; 2023 by{" "}
        <a
          href="https://github.com/zwiro"
          target="_blank"
          className="text-red-700 hover:underline"
        >
          zwiro
        </a>
      </p>
      <a href="https://www.themoviedb.org/" target="_blank">
        <Image src={tmdb} alt="The Movie DB" height={16} />
      </a>
    </footer>
  )
}

export default Footer
