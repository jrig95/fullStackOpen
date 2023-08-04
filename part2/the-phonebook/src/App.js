import { useState, useEffect } from "react";
import Person from "./components/person/Person";
import Filter from "./components/filter/Filter";
import Form from "./components/form/Form";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
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
    const personExists = persons.some(
      (person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    if (!personExists) {
      const maxId = persons.length > 0
    ? Math.max(...persons.map(person => person.id))
    : 0
      const personObject = {
        name: newName,
        number: newNumber,
        id: maxId + 1
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("")
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={searchFilter} handleSearchChange={handleSearchChange}/>

      <h2>Add a new</h2>
      <Form newPerson={newPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
