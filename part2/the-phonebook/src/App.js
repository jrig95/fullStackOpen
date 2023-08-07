import { useState, useEffect } from "react";
import Person from "./components/person/Person";
import Filter from "./components/filter/Filter";
import Form from "./components/form/Form";
import personService from "./services/persons";
import Notification from "./components/notification/notification";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((allPersons) => {
      console.log("promise fulfilled");
      setPersons(allPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const newPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const personExists = persons.find(
      (person) =>
        person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    if (personExists) {
      const updatedPerson = { ...personExists, number: newNumber };
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook, would you like to update the number?`
      );

      if (confirmUpdate) {
        personService
          .update(personExists.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(
              `The number for ${updatedPerson.name} was successfully updated!`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.error(
              `Information of ${updatedPerson.name} has already been removed from the server`,
              error
            );
            setErrorMessage(
              `Information of ${updatedPerson.name} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((returnPersons) => {
        setPersons(persons.concat(returnPersons));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`${personObject.name} was added to your phonebook!`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);

    if (confirmDelete) {
      personService
        .destroy(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("There is an error", error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter
        searchFilter={searchFilter}
        handleSearchChange={handleSearchChange}
      />

      <h2>Add a new</h2>
      <Form
        newPerson={newPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          deletePerson={deletePerson}
        />
      ))}
    </div>
  );
};

export default App;
