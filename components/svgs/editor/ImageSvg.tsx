import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const ImageSvg = ({ fill = 'currentColor', title = 'Insert Image' }: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 32 32"
  >
    <title>{title}</title>
    <path
      d="M20 12l-6 10-3.97-2.896-0.030-0.104-0.236-0.091 0.184 0.135-5.948 4.956v2h24v-2l-3-9-5-3zM9 13c1.656 0 3-1.343 3-3s-1.344-3-3-3-3 1.343-3 3 1.344 3 3 3zM31 2h-30c-0.552 0-1 0.448-1 1v26c0 0.553 0.448 1 1 1h30c0.553 0 1-0.447 1-1v-26c0-0.552-0.447-1-1-1zM30 27c0 0.553-0.447 1-1 1h-26c-0.552 0-1-0.447-1-1v-22c0-0.552 0.448-1 1-1h26c0.553 0 1 0.448 1 1v22z"
      fill={fill}
    ></path>
  </svg>
);

ImageSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default ImageSvg;
