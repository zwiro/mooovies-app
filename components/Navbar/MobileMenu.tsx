import { XMarkIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"

interface MobileMenuProps {
  toggleMobileMenu: () => void
  children: React.ReactNode
}

function MobileMenu({ toggleMobileMenu, children }: MobileMenuProps) {
  const mobileMenuAnimation = {
    initial: { x: "100vw" },
    animate: { x: 0 },
    exit: { x: "100vw" },
  }

  return (
    <motion.div
      {...mobileMenuAnimation}
      className="absolute top-0 right-0 h-screen border-l border-zinc-800 py-4 px-2 backdrop-blur"
    >
      <XMarkIcon
        onClick={toggleMobileMenu}
        className="ml-auto h-8 w-8 cursor-pointer transition-all hover:rotate-90 hover:text-red-500"
      />
      {children}
    </motion.div>
  )
}

export default MobileMenu
