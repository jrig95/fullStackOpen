import React from 'react'

const Total = (props) => {
  const exercises = props.parts
  console.log(exercises)
  return (

      <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>

  );
}

export default Total
