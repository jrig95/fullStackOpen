import React from 'react'

const History = (props) => {
  // check if history is 0 show div saying this app is used by clicking the button
  // if no zero say show this is the button press history
  if (props.allClicks.length === 0) {
    return (
      <div>This app is used by clicking the button</div>
    )
  }
  return (
    <div>Button  press history: {props.allClicks.join(' ')}</div>
  )
}

export default History
