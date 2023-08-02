import { useState } from "react";
import Person from "./components/person/Person";
import Filter from "./components/filter/Filter";
import Form from "./components/form/Form";

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");


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