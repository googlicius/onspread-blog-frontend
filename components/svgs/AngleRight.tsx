import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  width?: number;
  height?: number;
}

const AngleRight = ({
  fill = 'currentColor',
  width = 24,
  height = 24,
}: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <title>angle right</title>
    <path
      d="M9.984 6l6 6-6 6-1.406-1.406 4.594-4.594-4.594-4.594z"
      fill={fill}
    ></path>
  </svg>
);

AngleRight.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default AngleRight;
