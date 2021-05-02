import { ButtonHTMLAttributes, FC, forwardRef } from 'react';
import { ReactSVG } from 'react-svg';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
}

const HeartBtn = forwardRef<HTMLButtonElement, IProps>(
  ({ count, className, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={`btn d-flex align-items-center ${className}`}
      >
        <ReactSVG src="/assets/icon/heart-o.svg" className="mr-2" /> {count}
      </button>
    );
  },
);

export default HeartBtn;
