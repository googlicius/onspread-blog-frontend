import { ButtonHTMLAttributes, FC, forwardRef, useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
  onGiveHeart: (heart: number) => Promise<void>;
}

const HeartBtn = forwardRef<HTMLButtonElement, IProps>(
  ({ count, onGiveHeart, className, ...rest }, ref) => {
    const [totalHeart, setTotalHeart] = useState(0);
    const [newHeart, setNewHeart] = useState(0);

    const handleHeartClick = async () => {
      const heart = newHeart + 1;
      setNewHeart(heart);
      onGiveHeart(heart);
    };

    useEffect(() => {
      setTotalHeart(count);
      setNewHeart(0);
    }, [count]);

    return (
      <button
        {...rest}
        onClick={handleHeartClick}
        ref={ref}
        className={`btn d-flex align-items-center ${className}`}
      >
        <ReactSVG src="/assets/icon/heart-o.svg" className="mr-2" /> {totalHeart + newHeart || null}
      </button>
    );
  },
);

export default HeartBtn;
