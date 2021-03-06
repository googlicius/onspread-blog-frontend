import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const CheckSvg = ({ fill = 'currentColor', title }: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <title>{title}</title>
    <path
      d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z"
      fill={fill}
    ></path>
  </svg>
);

CheckSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default CheckSvg;
