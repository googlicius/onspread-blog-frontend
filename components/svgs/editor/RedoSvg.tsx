import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const RedoSvg = ({ fill = 'currentColor', title = 'Redo (Ctr+Y)' }: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <title>{title}</title>
    <path
      d="m14.958 9.367-2.189 1.837a.75.75 0 0 0 .965 1.149l3.788-3.18a.747.747 0 0 0 .21-.284.75.75 0 0 0-.17-.945L13.77 4.762a.75.75 0 1 0-.964 1.15l2.331 1.955H6.22A.75.75 0 0 0 6 7.9a4 4 0 1 0 1.477 7.718l-.344-1.489A2.5 2.5 0 1 1 6.039 9.4l-.008-.032h8.927z"
      fill={fill}
    ></path>
  </svg>
);

RedoSvg.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default RedoSvg;