import React from 'react';
import {CoursePart} from '../types'
import Part from './Part'


const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  console.log(courseParts)
  console.log()
  
  return (
    <div>
      {courseParts.map(course => { 
    if(course.type === 'special')
        return <div><br></br><b>{course.name} {course.exerciseCount}</b>
        <div><i>{course.description}</i></div>
        required skils: {course.requirements.join(", ")}</div>
    return <Part key={course.name} {...course} /> 
        })}
    
    </div>
    
  )}

export default Content
