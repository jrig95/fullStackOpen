import React from 'react'
import Part from './Part.jsx'

const Content = (props) => {
  const parts = props.parts
  return (
    <div>
      { parts.map (p => (
      <p>
        <Part part={p.name} exercise={p.exercises} />
      </p>
      )
  )}
    </div>

  );
}

export default Content
