import { useState } from 'react'
import './styles.css'

const Header = ( {title} ) => {
  return (
    <div>
      <p className="headerFontSize">{title}</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  )
}

const Statistics = (props) => {
  if ((props.good + props.neutral + props.bad) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.all} />
        <StatisticLine text='average' value={props.average} />
        <StatisticLine text='positive' value={props.positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title='Give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header title='Statistics' />
      <Statistics 
        good={good} 
        neutral={neutral}
        bad={bad}
        all={good + neutral + bad}
        average={(good-bad) / (good + neutral + bad)}
        positive={good / (good + neutral + bad) * 100 + " %"}
      />
    </div>
  )
}

export default App
