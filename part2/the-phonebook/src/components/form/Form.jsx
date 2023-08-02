import React from 'react'

const Form = ({ newPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={newPerson}>
        <div>
          name:
          <input
            value={newName}
            placeholder="enter a name"
            onChange={handleNameChange}
          />
        </div>
        <div>number: <input value={newNumber}
            placeholder="enter a number"
            onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default Form
