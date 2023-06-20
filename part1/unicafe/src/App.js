import { useState } from 'react'
import Button from './components/button/button.component'
import Header from './components/header/header.component'
import Statistics from './components/statistics/statistics.component'

import './App.css'

// next need to create a statistic component similar to button with text and value
// create statistics component that takes in the text and value
// statistics component if no feedback displays "there is no feedback", if feedback then display statistics



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // calculate average score
  const all = good + bad + neutral
  const average = (good - bad) / 100
  const positive = good > 0 ? (good/all) * 100 + '%' : 0



  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header className='header' text='give feedback' />

      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>

      <Header className='header' text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} average={average} all={all} positive={positive}/>

    </div>
  )
}

export default App
