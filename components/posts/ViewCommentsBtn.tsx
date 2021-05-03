import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ReactSVG } from 'react-svg';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
}

const ViewCommentsBtn = forwardRef<HTMLButtonElement, IProps>(
  ({ count, className, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={`btn btn-sm d-flex align-items-center ${className}`}
      >
        <ReactSVG src="/assets/icon/chat_bubble_outline.svg" className="mr-2" />{' '}
        {count}
      </button>
    );
  },
);

export default ViewCommentsBtn;
