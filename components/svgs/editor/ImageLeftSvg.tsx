import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const ImageLeftSvg = ({
  fill = 'currentColor',
  title = 'Image left',
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
      d="M8 26h28v3h-28v-3zM24 20h12v3h-12v-3zM0 8h21v15h-21v-15zM24 14h12v3h-12v-3zM24 8h12v3h-12v-3zM8 2h28v3h-28v-3z"
      fill={fill}
    ></path>
  </svg>
);

ImageLeftSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default ImageLeftSvg;
