const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  var total = parts.reduce(function (acc, part) { return acc + part.exercises }, 0);
  return ('Total of ' + total + ' exercises')
}

const Part = ({ part }) => 
  <span>
    {part.name} {part.exercises}
  </span>

const Content = ({ parts }) =>  {
  return (
    parts.map(part => 
      <p key={part.id}>
        <Part part={part} />
      </p>
      )
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <strong><Total parts={course.parts} /></strong>
    </div>
  )
}

export default Course