import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  width?: number;
  height?: number;
}

const AngleLeft = ({
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
    <title>angle left</title>
    <path
      d="M15.422 16.594l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z"
      fill={fill}
    ></path>
  </svg>
);

AngleLeft.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default AngleLeft;
