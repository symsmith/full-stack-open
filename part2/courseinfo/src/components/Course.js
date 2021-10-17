import React from "react"

const Header = ({ name }) => <h1>{name}</h1>

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Content = ({ parts }) => (
    <>
        {parts.map((part) => (
            <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
    </>
)

const Total = ({ parts }) => {
    return (
        <p><strong>total of {parts.reduce((sum, part) => (sum + part.exercises), 0)} exercises</strong></p>
    )
}

const Course = ({ course }) => (
    <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

export default Course
