const Header = ({ name }: { name: string }) => <h1>{name}</h1>

interface CoursePart {
  name: string
  exerciseCount: number
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return courseParts.map((part, index) => {
    return (
      <p key={index}>
        {part.name} {part.exerciseCount}
      </p>
    )
  })
}

const Footer = ({ total }: { total: number }) => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  )

  return (
    <>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Footer total={totalExercises} />
    </>
  )
}

export default App
