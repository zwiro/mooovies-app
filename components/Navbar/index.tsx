import Image from "next/image"
import logo from "@/public/logo.svg"
import { Bars3Icon } from "@heroicons/react/24/solid"
import { useState } from "react"
import NavLinks from "./NavLinks"
import MobileMenu from "./MobileMenu"
import { AnimatePresence } from "framer-motion"
import Link from "next/link"
import Searchbar from "./Searchbar"

function Navbar() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible((prevVisible) => !prevVisible)
  }

  return (
    <nav className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
      <Link href="/">
        <Image src={logo} alt="Logo" />
      </Link>
      <Searchbar />
      <Bars3Icon
        onClick={toggleMobileMenu}
        className="h-12 w-12 cursor-pointer transition-all hover:animate-wiggle"
      />
      <AnimatePresence>
        {isMobileMenuVisible && (
          <MobileMenu toggleMobileMenu={toggleMobileMenu}>
            <NavLinks />
          </MobileMenu>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
