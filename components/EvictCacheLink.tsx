import React, { AnchorHTMLAttributes, forwardRef } from 'react';
import { useRouter } from 'next/router';
import client from '@/configs/apollo-client';
import buildUrl from '@googlicius/build-url';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * Evict the apollo-client cache when re-click on a link.
 */
const EvictCacheLink = forwardRef<HTMLAnchorElement, Props>(
  ({ href, ...rest }: Props, ref) => {
    const router = useRouter();

    const handleClick = (e) => {
      e.preventDefault();

      if (href === buildUrl()) {
        client.cache.evict({});
        client.cache.gc();
      }

      router.push(href);
    };

    return <a {...rest} href={href} onClick={handleClick} ref={ref} />;
  },
);

EvictCacheLink.displayName = 'EvictCacheLink';

export default EvictCacheLink;
