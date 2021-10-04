import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const CodeSvg = ({
  fill = 'currentColor',
  title = 'Code Block (```)',
}: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 896 1024"
  >
    <title>{title}</title>
    <path
      d="M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z"
      fill={fill}
    ></path>
  </svg>
);

CodeSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default CodeSvg;
