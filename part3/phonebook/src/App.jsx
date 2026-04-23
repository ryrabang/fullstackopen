import { useState } from "react"

import phonebook from "./services/phonebook"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import { useEffect } from "react"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState("")
  const [notificationError, setNotificationError] = useState(false)

  useEffect(() => {
    phonebook.getAll().then((returnedPersons) => {
      setPersons(returnedPersons)
    })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setNewPhoneNumber(e.target.value)
  }
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const displayNotification = (message, isError = false) => {
    if (isError) {
      setNotificationError(true)
    }
    setMessage(message)
    setTimeout(() => {
      setMessage("")
      setNotificationError(false)
    }, 5000)
  }

  const createPerson = () => {
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newPhoneNumber,
    }
    phonebook
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson ? returnedPerson : newPerson))
        setNewName("")
        setNewPhoneNumber("")
        displayNotification(`Added ${returnedPerson.name}`)
      })
      .catch((err) => {
        console.log(err.error)
        displayNotification(err.response.data.error, true)
      })
  }

  const updatePerson = (oldPersonIndex) => {
    const oldPerson = persons[oldPersonIndex]
    const willUpdatePerson = window.confirm(
      `${oldPerson.name} is already added to phonebook, replace the old number with a new one?`,
    )
    if (willUpdatePerson) {
      phonebook
        .update(persons[oldPersonIndex].id, {
          ...oldPerson,
          number: newPhoneNumber,
        })
        .then((returnedPerson) => {
          const copy = [...persons]
          const updatedPerson = returnedPerson ? returnedPerson : oldPerson
          copy[oldPersonIndex] = updatedPerson
          setPersons(copy)
          setNewName("")
          setNewPhoneNumber("")
          displayNotification(`Updated ${updatedPerson.name}`)
        })
        .catch((error) => {
          displayNotification(error.response.data.error, true)
        })
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const oldPersonIndex = persons.findIndex(
      (person) => person.name === newName,
    )
    if (oldPersonIndex !== -1) {
      updatePerson(oldPersonIndex)
      return
    }
    createPerson()
  }

  const onDelete = (deletedPerson) => {
    const willDelete = window.confirm(`Delete ${deletedPerson.name}?`)

    if (willDelete) {
      phonebook
        .deletePerson(deletedPerson.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== deletedPerson.id))
        })
        .catch((error) => {
          displayNotification(error.response.data.error, true)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && (
        <Notification message={message} isError={notificationError} />
      )}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={onSubmit}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={onDelete} />
    </div>
  )
}

export default App
