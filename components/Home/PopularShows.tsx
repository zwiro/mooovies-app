import { FetchedDataShows } from "@/types"
import CardSlider from "../CardSlider"
import Card from "../Card"
import SectionHeader from "./SectionHeader"

interface PopularShowsProps {
  shows: FetchedDataShows
}

function PopularShows({ shows }: PopularShowsProps) {
  return (
    <>
      <SectionHeader title="Popular Shows" />
      <CardSlider>
        {shows.results.map((show) => (
          <Card key={show.id} image={show.backdrop_path} title={show.name} />
        ))}
      </CardSlider>
    </>
  )
}

export default PopularShows
