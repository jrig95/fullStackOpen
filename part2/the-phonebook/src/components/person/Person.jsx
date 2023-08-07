import React from 'react'

const Person = ({name, number, deletePerson, id}) => {
  return (
    <div>{name} {number} <button onClick={() => deletePerson(id, name) }>delete</button></div>

  )
}

export default Person
