import React, { useState, useEffect } from "react"
import axios from "axios"

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

const Persons = ({ entriesShown }) => (
  <div>
    {entriesShown.map((person) => (
      <p key={person.name}>
        {person.name} &mdash; {person.number}
      </p>
    ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteringValue, setFilteringValue] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((result) => {
      console.log(result.data)
      setPersons(result.data)
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
    if (persons.filter((e) => e.name === newName).length === 0) {
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 }
      ])
    } else {
      alert(`${newName} is already added to the phonebook`)
    }
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons entriesShown={entriesShown} />
    </div>
  )
}

export default App
