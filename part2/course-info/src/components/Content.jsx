import React from 'react'
import Part from './Part.jsx'

const Content = ({parts}) => {
  return (
    <div>
      { parts.map ((p, index) => (
      <div key={index}>
        <Part part={p.name} exercise={p.exercises} />
      </div>
      ))}
    </div>
  );
}


export default Content
