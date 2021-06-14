import PropTypes from 'prop-types';

interface Props {
  fill?: string;
}

const propTypes = {
  fill: PropTypes.string,
};

const CloseSvg = ({ fill = 'currentColor' }: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"
      fill={fill}
    ></path>
  </svg>
);

CloseSvg.propTypes = propTypes;

export default CloseSvg;
