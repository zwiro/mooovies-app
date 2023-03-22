interface ImageSliderProps {
  children: React.ReactNode
}

function ImageSlider({ children }: ImageSliderProps) {
  return (
    <div className="grid grid-flow-col gap-2 overflow-x-scroll pb-2">
      {children}
    </div>
  )
}

export default ImageSlider
