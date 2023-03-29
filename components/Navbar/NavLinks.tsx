import Link from "next/link"
import { useRouter } from "next/router"

function NavLinks() {
  const router = useRouter()
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV Shows", href: "/shows" },
    { name: "People", href: "/people" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ]
  return (
    <ul className="flex flex-col gap-4 px-8 pt-4 md:flex-grow md:flex-row md:justify-center md:gap-2 md:pt-0 lg:gap-12 xl:gap-24">
      {navLinks.map((navLink, i) => (
        <li
          key={`navLink-${i}`}
          className={`${
            router.pathname === navLink.href
              ? "translate-x-2 font-bold text-red-700 md:translate-x-0"
              : "transition-transform hover:translate-x-2 md:transition-none md:hover:translate-x-0"
          } hover:underline xl:text-lg`}
        >
          <Link href={navLink.href}>{navLink.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default NavLinks
