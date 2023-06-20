import React from 'react'
import StatisticLine from '../statistic/statistic.component'

const Statistics = ({good, bad, neutral, average, all, positive}) => {
  if(good === 0 && neutral === 0 && bad === 0) {
    return <h1>No feedback available</h1>
  }
  return (
    <div>
    <table>
      <tbody>
    <StatisticLine text='good' value={good}/>
    <StatisticLine text='neutral' value={neutral}/>
    <StatisticLine text='bad' value={bad}/>
    <StatisticLine text='all' value={all}/>
    <StatisticLine text='average' value={average}/>
    <StatisticLine text='positive' value={positive}/>
    </tbody>
    </table>
    </div>
  )
}

export default Statistics
