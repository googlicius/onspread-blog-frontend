import PropTypes from 'prop-types';

interface Props {
  fill?: string;
  title?: string;
}

const HandLizard = ({ fill = 'currentColor', title }: Props) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="28"
    viewBox="0 0 32 28"
  >
    <title>{title}</title>
    <path
      d="M17.984 0c1.266 0 2.484 0.609 3.234 1.641l8.937 12.203c1.203 1.625 1.844 3.578 1.844 5.609v5.547c0 1.656-1.344 3-3 3h-6c-1.656 0-3-1.344-3-3v-2.766l-4.469-2.234h-8.531c-1.656 0-3-1.344-3-3v-0.5c0-2.484 2.016-4.5 4.5-4.5h6.563l0.656-2h-10.719c-2.078 0-3.813-1.594-3.984-3.656-0.656-0.797-1.016-1.813-1.016-2.844v-0.5c0-1.656 1.344-3 3-3h14.984zM30 25v-5.547c0-1.578-0.516-3.156-1.453-4.438l-8.953-12.203c-0.375-0.5-0.969-0.812-1.609-0.812h-14.984c-0.547 0-1 0.453-1 1 0 0.828 0.016 1.406 0.562 2.078 0.203-0.641 0.781-1.078 1.437-1.078h13v0.5h-13c-0.547 0-1 0.453-1 1 0 0.297-0.016 0.609 0.047 0.906 0.172 0.922 1.016 1.594 1.953 1.594h11.422c0.828 0 1.5 0.672 1.5 1.5 0 0.156-0.031 0.328-0.078 0.469l-1 3c-0.203 0.609-0.781 1.031-1.422 1.031h-6.922c-1.375 0-2.5 1.125-2.5 2.5v0.5c0 0.547 0.453 1 1 1h8.766c0.156 0 0.313 0.031 0.453 0.109l4.953 2.469c0.5 0.266 0.828 0.781 0.828 1.344v3.078c0 0.547 0.453 1 1 1h6c0.547 0 1-0.453 1-1z"
      fill={fill}
    ></path>
  </svg>
);

HandLizard.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
};

export default HandLizard;
