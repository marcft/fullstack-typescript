import courseParts, { CoursePart } from './data';

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const Part = ({ part }: { part: CoursePart }) => {
  const noBottomMargin = { marginBottom: 0 };
  const noTopMargin = { marginTop: 0 };

  const partTitle = (
    <h3 style={noBottomMargin}>
      {part.name} {part.exerciseCount}
    </h3>
  );

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          {partTitle}
          <p style={noTopMargin}>
            <em>{part.description}</em>
          </p>
        </div>
      );

    case 'group':
      return (
        <div>
          {partTitle}
          <p style={noTopMargin}>Project exercises: {part.groupProjectCount}</p>
        </div>
      );

    case 'background':
      return (
        <div>
          {partTitle}
          <p style={{ ...noTopMargin, ...noBottomMargin }}>
            <em>{part.description}</em>
          </p>
          <p style={noTopMargin}>Submit to: {part.backgroundMaterial}</p>
        </div>
      );

    case 'special':
      return (
        <div>
          {partTitle}
          <p style={{ ...noTopMargin, ...noBottomMargin }}>
            <em>{part.description}</em>
          </p>
          <p style={noTopMargin}>
            Required skills: {part.requirements.join(', ')}
          </p>
        </div>
      );

    default:
      return assertNever(part);
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return courseParts.map((part, index) => {
    return <Part key={index} part={part} />;
  });
};

const Footer = ({ total }: { total: number }) => (
  <p>Number of exercises {total}</p>
);

const App = () => {
  const courseName = 'Half Stack application development';
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Footer total={totalExercises} />
    </>
  );
};

export default App;
