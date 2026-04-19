const Person = ({ person, onDelete }) => {
  const { name, number } = person
  return (
    <p>
      {`${name} ${number}`} <button onClick={onDelete}>delete</button>
    </p>
  )
}

export default Person
