import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const BlockquoteSvg = ({
  fill = 'currentColor',
  title = 'Block Quote',
}: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 640 896"
  >
    <title>{title}</title>
    <path
      d="M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z"
      fill={fill}
    ></path>
  </svg>
);

BlockquoteSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default BlockquoteSvg;
