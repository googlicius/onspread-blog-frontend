import { MeState } from '@/redux/interface';
import { selectMe } from '@/redux/meProducer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  redirectUrl?: string;
}

/**
 * Auth Guard:
 * - Redirect to login page when unauthenticated.
 */
const useAuthGuard = (props?: Props): MeState => {
  const router = useRouter();
  const me = useSelector(selectMe);

  const redirectUrl = props?.redirectUrl || '/';

  useEffect(() => {
    // Return because user is loading...
    if (me.status !== 'idle') {
      return;
    }

    if (!me.value) {
      router.push(redirectUrl);
    }
  }, [me]);

  return me;
};

export default useAuthGuard;
