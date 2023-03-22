import Image from "next/image"
import logo from "@/public/logo.svg"
import Link from "next/link"
import useMediaQuery from "@/hooks/useMediaQuery"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

function Navbar() {
  const isDesktopMenu = useMediaQuery("(min-width: 768px)")

  return (
    <nav className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
      <Link href="/">
        <Image src={logo} alt="Logo" />
      </Link>
      {isDesktopMenu ? <DesktopNav /> : <MobileNav />}
    </nav>
  )
}

export default Navbar
