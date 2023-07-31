import React from 'react'

const Total = (props) => {
  const exercises = props.parts
  console.log(exercises)
  const total = exercises.reduce((acc, cur) => acc + cur, 0)
  return (

      <p  style={{fontWeight: 'bold'}}>Number of exercises {total}</p>

  );
}

export default Total
