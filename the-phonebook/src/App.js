import { useState } from 'react'
import Person from './components/person/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const newPerson = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newPerson}>
        <div>
          name: <input value={newName} placeholder='enter a name' onChange={handleNameChange}/>
        </div>
        <div>debug: {newName}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) =>
      <Person key={index} name={person.name}/>
      )}
    </div>
  )
}

export default App
