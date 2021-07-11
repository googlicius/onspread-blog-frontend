import { selectMe } from '@/redux/meProducer';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface Props {
  isDirty: boolean;
  isEditForm?: boolean;
  redirectUrl?: string;
}

interface UseFormGuardReturn {
  checkUnSavedForm: () => void;
}

/**
 * Form Guard:
 * - Redirect when unauthenticated.
 * - Inform to user when leaving without save.
 */
const useFormGuard = ({
  isDirty,
  redirectUrl = '/',
  isEditForm = false,
}: Props): UseFormGuardReturn => {
  const { t } = useTranslation();
  const router = useRouter();
  const me = useSelector(selectMe);

  const checkUnSavedForm = useCallback(() => {
    const msg = isEditForm
      ? 'Do you want to cancel editing?'
      : 'Do you want to cancel creating?';

    if (isDirty && !confirm(t(msg))) {
      router.events.emit('routeChangeError');
      throw 'Abort route change. Please ignore this error.';
    }
  }, [isDirty]);

  useEffect(() => {
    // Return because user is loading...
    if (me.status !== 'idle') {
      return;
    }

    if (!me.value) {
      router.events.off('routeChangeStart', checkUnSavedForm);
      router.push(redirectUrl);
    }
  }, [me]);

  useEffect(() => {
    router.events.on('routeChangeStart', checkUnSavedForm);

    return function cleanUp() {
      router.events.off('routeChangeStart', checkUnSavedForm);
    };
  }, [checkUnSavedForm]);

  return {
    checkUnSavedForm,
  };
};

export default useFormGuard;
