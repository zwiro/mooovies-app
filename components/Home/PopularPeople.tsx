import { FetchedDataPeople } from "@/types"
import CardSlider from "../CardSlider"
import Card from "../Card"
import SectionHeader from "./SectionHeader"

interface PopularPeopleProps {
  people: FetchedDataPeople
}

function PopularPeople({ people }: PopularPeopleProps) {
  return (
    <>
      <SectionHeader title="Popular People" />
      <CardSlider>
        {people.results.map((person) => (
          <Card
            key={person.id}
            image={person.profile_path}
            title={person.name}
          />
        ))}
      </CardSlider>
    </>
  )
}

export default PopularPeople
