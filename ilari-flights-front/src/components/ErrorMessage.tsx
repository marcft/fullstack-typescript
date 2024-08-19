const ErrorMessage = ({ errorMessage }: { errorMessage: string | null }) => {
  if (!errorMessage) {
    return null;
  }

  const style = { color: 'red', fontSize: '18px', fontStyle: 'italic' };

  return <p style={style}>{errorMessage}</p>;
};

export default ErrorMessage;
