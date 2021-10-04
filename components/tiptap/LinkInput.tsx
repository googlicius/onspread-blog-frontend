import React, { useRef } from 'react';
import { Button, Input } from 'reactstrap';
import cs from 'classnames';
import styles from './styles.module.scss';
import CheckSvg from '../svgs/CheckSvg';
import CloseSvg from '../svgs/CloseSvg';

interface Props {
  onSubmit: (link: string) => void;
  onClose: () => void;
}

const LinkInput = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputRef.current.value) {
      props.onSubmit(inputRef.current.value);
    }
  };

  return (
    <div className="d-flex w-100">
      <Input
        innerRef={inputRef}
        autoFocus
        placeholder="Enter a link"
        className={cs('shadow-none flex-grow', styles['link-input'])}
        onKeyPress={handleKeyPress}
      />

      <Button onClick={handleSubmit} className="text-success py-0">
        <CheckSvg />
      </Button>

      <Button onClick={props.onClose} className="text-danger py-0">
        <CloseSvg />
      </Button>
    </div>
  );
};

export default LinkInput;
