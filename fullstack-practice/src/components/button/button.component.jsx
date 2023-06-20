import React from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default Button;

// create button that has props of handleClick and text.
// handleClick is for the onClick function in our counter component.
// text is for 'left' and 'right' buttons
