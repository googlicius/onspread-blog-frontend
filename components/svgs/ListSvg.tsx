import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const ListSvg = ({ fill = 'currentColor', title }: Props) => (
  <svg
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <title>{title}</title>
    <g>
      <path
        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
        fill={fill}
      ></path>
    </g>
  </svg>
);

ListSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default ListSvg;
