import Person from "./Person"

const Persons = ({ persons, filter, onDelete }) => {
  const filterLowerCase = filter.toLowerCase()
  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filterLowerCase))
        .map((person) => (
          <Person
            key={person.id}
            person={person}
            onDelete={() => onDelete(person)}
          />
        ))}
    </>
  )
}

export default Persons
