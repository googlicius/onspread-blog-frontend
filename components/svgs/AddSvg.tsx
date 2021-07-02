import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const AddSvg = ({ fill = 'currentColor', title }: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <title>{title}</title>
    <path
      d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"
      fill={fill}
    ></path>
  </svg>
);

AddSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default AddSvg;
