import React from "react"

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )
      })}
    </>
  )
}

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        total of{" "}
        {parts.reduce((sum, value) => {
          return (sum += value.exercises)
        }, 0)}{" "}
        exercises
      </b>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
