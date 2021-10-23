import React, { useState, useEffect } from "react"
import "./App.css"
import personsUtils from "./services/persons"

const Notification = ({ level, message }) => (
  <div className={`notification ${level}`}>{message}</div>
)

const Filter = ({ filteringValue, handleFilteringChange }) => (
  <div>
    filter with{" "}
    <input value={filteringValue} onChange={handleFilteringChange} />
  </div>
)

const Form = ({
  handleSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input required value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input required value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ entriesShown, setPersons, setNotificationStatus }) => {
  const handleDelete = (id) => {
    personsUtils.deletePerson(id).then(() => {
      personsUtils.getAll().then((allPersons) => {
        setPersons(allPersons)
        setNotificationStatus({
          show: true,
          level: "success",
          message: "Removed entry"
        })
        setTimeout(() => {
          setNotificationStatus({ show: false, level: "", message: "" })
        }, 5000)
      })
    })
  }
  return (
    <div>
      {entriesShown.map((person) => (
        <p key={person.name}>
          {person.name} &mdash; {person.number}{" "}
          <button
            onClick={() =>
              window.confirm(`Delete ${person.name}?`)
                ? handleDelete(person.id)
                : null
            }
          >
            Delete
          </button>
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteringValue, setFilteringValue] = useState("")
  const [notificationStatus, setNotificationStatus] = useState({
    show: false,
    message: "",
    level: ""
  })

  useEffect(() => {
    personsUtils.getAll().then((allNumbers) => {
      setPersons(allNumbers)
    })
  }, [])

  let entriesShown = persons.filter((e) =>
    e.name.toLowerCase().includes(filteringValue.toLowerCase())
  )

  const handleFilteringChange = (event) => {
    setFilteringValue(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      persons.filter((e) => e.name.toLowerCase() === newName.toLowerCase())
        .length === 0
    ) {
      personsUtils
        .sendPerson({
          name: newName,
          number: newNumber,
          id: persons.length + 1
        })
        .then((newPerson) => {
          setPersons([...persons, newPerson])
          setNotificationStatus({
            show: true,
            level: "success",
            message: `Added ${newPerson.name}`
          })
          setTimeout(() => {
            setNotificationStatus({ show: false, level: "", message: "" })
          }, 5000)
        })
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        )
        personsUtils
          .changeNumber({
            ...person,
            number: newNumber
          })
          .then((newPerson) => {
            setPersons(persons.map((p) => (p.id !== person.id ? p : newPerson)))
            setNotificationStatus({
              show: true,
              level: "success",
              message: `Edited ${newPerson.name}`
            })
            setTimeout(() => {
              setNotificationStatus({ show: false, level: "", message: "" })
            }, 5000)
          })
      }
    }
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationStatus.show ? (
        <Notification
          level={notificationStatus.level}
          message={notificationStatus.message}
        />
      ) : null}
      <Filter
        filteringValue={filteringValue}
        handleFilteringChange={handleFilteringChange}
      />
      <h2>Add a new entry</h2>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        entriesShown={entriesShown}
        setPersons={setPersons}
        setNotificationStatus={setNotificationStatus}
      />
    </div>
  )
}

export default App
