import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
    return(
      <strong>total of {sum} exercises</strong>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part) => <Part part={part} />)}
      </div>
    )
  }

  const Course = ({ course }) => {
      return (
          <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </>
      )
  }

  export default Course