import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header1 course={course} />
        <Header2 course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
      
    )
  }
  const Total = ({ course }) => {
    const totalExercises = course.parts.reduce((s, p) => s += p.exercises, 0)
      return (
        <div>
        <b>total of {totalExercises} exercises</b>
        </div>
    )
    
  }
  const Header1 = ({ course }) => {
    return (
      <div>
      <h1>Web development curriculum</h1>
      </div>
    )
  }
  
  const Header2 = ({ course }) => {
    return (
      <div>
      <h2>{course.name}</h2>
      </div>
    )
  }
  const Content = ({ course }) => {
    return(
      <div>
        {course.parts.map(course =>
        <Part key={course.id} course={course} />
        )}
      </div>
    )
    
  }
  const Part = (props) => {
    
    return (
      <p>
        {props.course.name} {props.course.exercises}
      </p>    
    )
  }


export default Course