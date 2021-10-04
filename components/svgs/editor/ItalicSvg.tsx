import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const ItalicSvg = ({ fill = 'currentColor', title = 'Italic' }: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 585 1024"
  >
    <title>{title}</title>
    <path
      d="M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z"
      fill={fill}
    ></path>
  </svg>
);

ItalicSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default ItalicSvg;
