import React from 'react'
import { useState } from 'react'
import Button from '../reset-app-button/resetAppButton.component'

const ResetApp = () => {
  const [value, setValue] = useState(10)


  // function to handle the event handler
  // const handleClick = () => {
  //   console.log('clicked the button G')
  //   setValue(0)
  // }

  // function that returns another function
//   const hello = (who) => () => {
//   console.log('hello', who)
// }

// function that sets value calling another function
// const setToValue = (newValue) => () => {
//   console.log('value now', newValue)  // print the new value to console
//     setValue(newValue)
// }

// not required to call another function to achieve this functionality
const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }


  return (
    <div>
        {value}
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}

export default ResetApp;
