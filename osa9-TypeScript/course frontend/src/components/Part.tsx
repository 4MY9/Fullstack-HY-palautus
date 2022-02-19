import React from 'react';
import {CoursePart} from '../types'


const assertNever = (value: never): never => {
    console.log('vlue', value)
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part: React.FC<CoursePart> = props => {
    const part= props

        console.log('type', part.type)
        switch (part.type) {
            case "normal":
                return(
                    <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    <br></br>
                    </div> 
                )
            case "submission":
                return(
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    submit to {part.exerciseSubmissionLink}
                    <br></br>
                    </div>
                )
            case "groupProject":
                return(
                    <div>
                        <b>{part.name} {part.exerciseCount}</b>
                        <div>project exercises {part.groupProjectCount}</div>
                        <br></br>
                        </div>
                    )
           case "special":
                return(
                    null
                        )
                    
            default:
                return assertNever(part);
            

        }

    }

export default Part