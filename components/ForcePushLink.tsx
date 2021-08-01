import React, { HTMLAttributes, useRef } from 'react';
import { useRouter } from 'next/router';

interface Props extends HTMLAttributes<HTMLAnchorElement> {}

/**
 * Push any link.
 */
const ForcePushLink = (props: Props) => {
  const innerRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(innerRef.current.href);
  };

  return <a {...props} onClick={handleClick} ref={innerRef} />;
};

export default ForcePushLink;
