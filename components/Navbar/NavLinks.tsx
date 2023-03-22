import Link from "next/link"
import { useRouter } from "next/router"

function NavLinks() {
  const router = useRouter()
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV Series", href: "/series" },
    { name: "People", href: "/people" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ]
  return (
    <ul className="flex flex-col gap-4 px-8 pt-4">
      {navLinks.map((navLink, i) => (
        <Link key={`navLink-${i}`} href={navLink.href}>
          <li
            className={`${
              router.pathname === navLink.href && "pl-2 font-bold text-red-700"
            }`}
          >
            {navLink.name}
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default NavLinks
