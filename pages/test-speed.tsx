interface Props {
  isOk: string;
}

const TestSpeed = ({ isOk }: Props): JSX.Element => {
  return <div>Is OK: {isOk}</div>;
};

TestSpeed.getInitialProps = async () => {
  return {
    isOk: 'OK',
  };
};

export default TestSpeed;
