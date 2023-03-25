import {
  FetchedDataMovies,
  FetchedDataPeople,
  FetchedDataShows,
  Movie,
  Person,
  Show,
} from "@/types"
import CardSlider from "../CardSlider"
import Card from "../Card"
import SectionHeader from "./SectionHeader"

interface PopularSectionProps {
  data: FetchedDataPeople | FetchedDataMovies | FetchedDataShows
  title: string
  openCard: (id: number) => void
}

function PopularSection({ data, title, openCard }: PopularSectionProps) {
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
            openCard={openCard}
          />
        ))}
      </CardSlider>
    </>
  )
}

export default PopularSection

function isPeople(data: Person | Movie | Show): data is Person {
  return "profile_path" in data
}

function isMovies(data: Person | Movie | Show): data is Movie {
  return "title" in data
}
