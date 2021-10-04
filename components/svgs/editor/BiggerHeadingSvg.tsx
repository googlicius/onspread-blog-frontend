import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const BiggerHeadingSvg = ({
  fill = 'currentColor',
  title = 'Bigger Heading',
}: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 21 21"
  >
    <title>{title}</title>
    <path
      d="M3 2v4.747h1.656l.383-2.568.384-.311h3.88V15.82l-.408.38-1.56.12V18h7.174v-1.68l-1.56-.12-.407-.38V3.868h3.879l.36.311.407 2.568h1.656V2z"
      fill={fill}
    ></path>
  </svg>
);

BiggerHeadingSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default BiggerHeadingSvg;
