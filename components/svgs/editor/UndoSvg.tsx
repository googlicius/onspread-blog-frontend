import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const UndoSvg = ({ fill = 'currentColor', title = 'Undo (Ctr+Z)' }: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <title>{title}</title>
    <path
      d="m5.042 9.367 2.189 1.837a.75.75 0 0 1-.965 1.149l-3.788-3.18a.747.747 0 0 1-.21-.284.75.75 0 0 1 .17-.945L6.23 4.762a.75.75 0 1 1 .964 1.15L4.863 7.866h8.917A.75.75 0 0 1 14 7.9a4 4 0 1 1-1.477 7.718l.344-1.489a2.5 2.5 0 1 0 1.094-4.73l.008-.032H5.042z"
      fill={fill}
    ></path>
  </svg>
);

UndoSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default UndoSvg;
