import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const DragSvg = ({ fill = 'currentColor', title }: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <title>{title}</title>
    <path
      d="M15 15.984q0.797 0 1.406 0.609t0.609 1.406-0.609 1.406-1.406 0.609-1.406-0.609-0.609-1.406 0.609-1.406 1.406-0.609zM15 9.984q0.797 0 1.406 0.609t0.609 1.406-0.609 1.406-1.406 0.609-1.406-0.609-0.609-1.406 0.609-1.406 1.406-0.609zM15 8.016q-0.797 0-1.406-0.609t-0.609-1.406 0.609-1.406 1.406-0.609 1.406 0.609 0.609 1.406-0.609 1.406-1.406 0.609zM9 3.984q0.797 0 1.406 0.609t0.609 1.406-0.609 1.406-1.406 0.609-1.406-0.609-0.609-1.406 0.609-1.406 1.406-0.609zM9 9.984q0.797 0 1.406 0.609t0.609 1.406-0.609 1.406-1.406 0.609-1.406-0.609-0.609-1.406 0.609-1.406 1.406-0.609zM11.016 18q0 0.797-0.609 1.406t-1.406 0.609-1.406-0.609-0.609-1.406 0.609-1.406 1.406-0.609 1.406 0.609 0.609 1.406z"
      fill={fill}
    ></path>
  </svg>
);

DragSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default DragSvg;
