import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Bars3Icon } from "@heroicons/react/24/solid"
import MobileMenu from "./MobileMenu"
import NavLinks from "./NavLinks"
import Searchbar from "./Searchbar"

function MobileNav() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible((prevVisible) => !prevVisible)
  }

  return (
    <>
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
    </>
  )
}

export default MobileNav
