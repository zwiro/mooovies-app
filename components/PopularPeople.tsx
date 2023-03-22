import { FetchedDataPeople } from "@/types"
import CardSlider from "./CardSlider"
import Card from "./Card"

interface PopularPeopleProps {
  people: FetchedDataPeople
}

function PopularPeople({ people }: PopularPeopleProps) {
  return (
    <>
      <h2>Popular People</h2>
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
