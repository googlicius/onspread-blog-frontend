import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  width?: number;
  height?: number;
  title?: string;
}

const PencilSvg = ({
  fill = 'currentColor',
  width = 24,
  height = 24,
  title,
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <path
      d="M20.719 7.031l-1.828 1.828-3.75-3.75 1.828-1.828q0.281-0.281 0.703-0.281t0.703 0.281l2.344 2.344q0.281 0.281 0.281 0.703t-0.281 0.703zM3 17.25l11.063-11.063 3.75 3.75-11.063 11.063h-3.75v-3.75z"
      fill={fill}
    />
  </svg>
);

PencilSvg.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
};

export default PencilSvg;
