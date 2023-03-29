import useMediaQuery from "@/hooks/useMediaQuery"
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid"
import { useRef } from "react"

interface ImageSliderProps {
  children: React.ReactNode
}

function ImageSlider({ children }: ImageSliderProps) {
  const isLgScreen = useMediaQuery("(min-width: 1024px)")
  const sliderRef = useRef<HTMLDivElement>(null)
  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="grid snap-x grid-flow-col gap-2 overflow-x-scroll scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
      >
        <button
          onClick={() =>
            sliderRef.current !== null &&
            (sliderRef.current.scrollLeft -= isLgScreen ? 450 : 350)
          }
          className="absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer"
        >
          <ArrowLeftCircleIcon />
        </button>
        {children}
        <button
          onClick={() =>
            sliderRef.current !== null &&
            (sliderRef.current.scrollLeft += isLgScreen ? 450 : 350)
          }
          className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 rotate-180 cursor-pointer"
        >
          <ArrowLeftCircleIcon />
        </button>
      </div>
    </div>
  )
}

export default ImageSlider
