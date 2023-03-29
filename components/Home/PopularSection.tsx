import {
  FetchedDataMovies,
  FetchedDataPeople,
  FetchedDataShows,
  isMovies,
  isPeople,
} from "@/types"
import CardSlider from "../CardSlider"
import Card from "../Card"
import SectionHeader from "./SectionHeader"

interface PopularSectionProps {
  data: FetchedDataPeople | FetchedDataMovies | FetchedDataShows
  title: string
  toggleCard: (id: number) => void
}

function PopularSection({ data, title, toggleCard }: PopularSectionProps) {
  return (
    <>
      <SectionHeader title={title} />
      <CardSlider>
        {data.results.map((data) => (
          <Card
            key={data.id}
            id={data.id}
            image={isPeople(data) ? data.profile_path : data.backdrop_path}
            title={isMovies(data) ? data.title : data.name}
            toggleCard={toggleCard}
            isCardSlider
          />
        ))}
      </CardSlider>
    </>
  )
}

export default PopularSection
