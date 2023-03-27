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
    <ul className="flex flex-col gap-4 px-8 pt-4 md:flex-row md:justify-center md:gap-2 md:pt-0">
      {navLinks.map((navLink, i) => (
        <Link key={`navLink-${i}`} href={navLink.href}>
          <li
            className={`${
              router.pathname === navLink.href
                ? "translate-x-2 font-bold text-red-700 md:translate-x-0"
                : "transition-transform hover:translate-x-2 md:transition-none md:hover:translate-x-0"
            } hover:underline`}
          >
            {navLink.name}
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default NavLinks
