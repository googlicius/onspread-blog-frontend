import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
  onGiveHeart: (heart: number) => Promise<void>;
}

const HeartBtn = forwardRef<HTMLButtonElement, Props>(
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
        className={`btn btn-big d-flex align-items-center ${className}`}
      >
        <ReactSVG src="/assets/icon/heart-o.svg" className="mr-2" />{' '}
        {totalHeart + newHeart || null}
      </button>
    );
  },
);

HeartBtn.displayName = 'HeartBtn';

HeartBtn.propTypes = {
  count: PropTypes.number,
  onGiveHeart: PropTypes.func,
  className: PropTypes.string,
};

export default HeartBtn;
