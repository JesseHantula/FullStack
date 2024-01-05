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

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const updateVote = (vote, selected) => {
  const copy = [...vote]
  copy[selected] += 1
  return (copy)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [vote, setVote] = useState(new Array(8).fill(0))
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <Header title='Anecdote of the Day' />
      {anecdotes[selected]}
      <br />
      has {vote[selected]} votes
      <br />
      <Button handleClick={() => setVote(updateVote(vote, selected))} text='Vote' />
      <Button handleClick={() => setSelected(getRandomInt(0, anecdotes.length-1))} text='Get next anecdote' />
      <Header title='Anecdote with most votes' />
      {anecdotes[vote.indexOf(Math.max(...vote))]}
    </div>
  )
}

export default App