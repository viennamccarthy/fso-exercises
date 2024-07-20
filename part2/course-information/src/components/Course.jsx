const Header = ({ name }) => {
  return (
  <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
  <>
    <ul>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </ul>
    <p>Total number of exercises: {total}</p>
  </>
  )
}

const Part = ({part: {name, exercises}}) => {

  return (
  <li>{name} {exercises}</li>
  )
}

const Course = ({ course: { name, parts } }) => {

  return (
    <section>
      <Header name={name} />
      <Content parts={parts} />
    </section>
  )
}

export default Course;
