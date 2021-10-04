import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const ImageCenterSvg = ({
  fill = 'currentColor',
  title = 'Image center',
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
      d="M4 26h28v3h-28v-3zM4 8h28v15h-28v-15zM4 2h28v3h-28v-3z"
      fill={fill}
    ></path>
  </svg>
);

ImageCenterSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default ImageCenterSvg;
