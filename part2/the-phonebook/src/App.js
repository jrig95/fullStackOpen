import { useState, useEffect } from "react";
import Person from "./components/person/Person";
import Filter from "./components/filter/Filter";
import Form from "./components/form/Form";
import personService from "./services/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(allPersons => {
      console.log('promise fulfilled')
      setPersons(allPersons)
    })
  }, [])


  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value)
  }


  const newPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const personExists = persons.find(
      (person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    if (personExists){
      const updatedPerson = {...personExists, number: newNumber}
      const confirmUpdate = window.confirm(`${newName} is already in the phonebook, would you like to update the number?`)

      if (confirmUpdate) {
        personService
        .update(personExists.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('there is an error', error)
        })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
      .create(personObject)
      .then(returnPersons => {
      setPersons(persons.concat(returnPersons));
      setNewName("");
      setNewNumber("")
      })
    }
  };

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)

    if (confirmDelete) {
    axios
    .destroy(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      console.error("There is an error", error)
    })
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={searchFilter} handleSearchChange={handleSearchChange}/>

      <h2>Add a new</h2>
      <Form newPerson={newPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} id={person.id} name={person.name} number={person.number} deletePerson={deletePerson}/>
      ))}

    </div>
  );
};

export default App;
