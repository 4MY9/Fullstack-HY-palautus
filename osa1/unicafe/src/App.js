import React, { useState } from 'react'


const Header = (props) => {
  
  return (
    <div>
        <h1>{props.header}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>{props.stats}</h1>
        No feedback given
      </div>
      )
    }
  

  return (
    <div>
      <h1>{props.stats}</h1>
      <table>
        <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.all}/>
        <StatisticLine text="average" value ={props.average} />
        <StatisticLine text="positive" value ={props.positive} text2="%" />
        </tbody>
      </table>
      </div>
      )
    }

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
      )
    }
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )  
        
}


const App = (props) => {
  const header = 'give feedback'
  const stats = 'statistics'
  
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const all = good + bad + neutral
  const average = ((good*1 + bad*(-1))/all).toFixed(1)
  const positive = ((good / all)*100).toFixed(1)


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
      <Header header={header}/>
      
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics stats={stats} good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
      
        
      
      
      
      
      
      
      
    </div>
  )
}


export default App;