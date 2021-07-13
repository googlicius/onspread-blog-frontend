import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  width?: number;
  height?: number;
  title?: string;
}

const TrashSvg = ({
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
      d="M18.984 3.984v2.016h-13.969v-2.016h3.469l1.031-0.984h4.969l1.031 0.984h3.469zM6 18.984v-12h12v12q0 0.797-0.609 1.406t-1.406 0.609h-7.969q-0.797 0-1.406-0.609t-0.609-1.406z"
      fill={fill}
    />
  </svg>
);

TrashSvg.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
};

export default TrashSvg;
