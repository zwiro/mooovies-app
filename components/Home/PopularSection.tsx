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
}

function PopularPeople({ data, title }: PopularSectionProps) {
  return (
    <>
      <SectionHeader title={title} />
      <CardSlider>
        {data.results.map((data) => (
          <Card
            key={data.id}
            image={isPeople(data) ? data.profile_path : data.backdrop_path}
            title={isMovies(data) ? data.title : data.name}
          />
        ))}
      </CardSlider>
    </>
  )
}

export default PopularPeople

function isPeople(data: Person | Movie | Show): data is Person {
  return "profile_path" in data
}

function isMovies(data: Person | Movie | Show): data is Movie {
  return "title" in data
}
