import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good_count, neutral_count, bad_count }) => {
  
  const all = good_count + neutral_count + bad_count

  if(all === 0) return ( <div>No feedback given</div>)

  const average = (good_count + (bad_count * -1))/all
  const positive = (good_count/all) * 100

    return(
      <table>
        <tbody>
        <Statistic text="good" value={good_count} />
        <Statistic text="neutral" value={neutral_count} />
        <Statistic text="bad" value={bad_count} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average.toFixed(2)} />
        <Statistic text="positive" value={positive.toFixed(2) + "%"} />
        </tbody>
      </table>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good_count={good} neutral_count={neutral} bad_count={bad} />
    </div>
  )
}

export default App