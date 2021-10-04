import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const ImageWideSvg = ({
  fill = 'currentColor',
  title = 'Image wide',
}: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 36 32"
  >
    <title>{title}</title>
    <path
      d="M4 26h28v3h-28v-3zM0 8h36v15h-36v-15zM4 2h28v3h-28v-3z"
      fill={fill}
    ></path>
  </svg>
);

ImageWideSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default ImageWideSvg;
