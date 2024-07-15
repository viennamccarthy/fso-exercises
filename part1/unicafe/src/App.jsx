import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={(good - bad) / total} />
          <StatisticLine text="Positive" value={(good / total) * 100 + '%'} />
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given</p>;
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return (
  <div>
    <h1>Give feedback</h1>
    <Button handleClick={() => setGood(good + 1)} text="good"/>
    <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
    <Button handleClick={() => setBad(bad + 1)} text="bad"/>
    <h1>Statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} />
  </div>
  )
}

export default App;
