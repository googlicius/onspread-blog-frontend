import { MeState } from '@/redux/interface';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAuthGuard from './auth-guard';

interface Props {
  isDirty: boolean;
  isEditForm?: boolean;
  redirectUrl?: string;
}

interface UseFormGuardReturn {
  me: MeState;
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
  const me = useAuthGuard({ redirectUrl });

  const checkUnSavedForm = useCallback(() => {
    const msg = isEditForm
      ? 'Do you want to cancel editing?'
      : 'Do you want to cancel creating?';

    if (isDirty && me.value && !confirm(t(msg))) {
      router.events.emit('routeChangeError');
      throw 'Abort route change. Please ignore this error.';
    }
  }, [isDirty, me]);

  useEffect(() => {
    if (me.value) {
      router.events.on('routeChangeStart', checkUnSavedForm);
    }

    return function cleanUp() {
      router.events.off('routeChangeStart', checkUnSavedForm);
    };
  }, [checkUnSavedForm]);

  return {
    me,
    checkUnSavedForm,
  };
};

export default useFormGuard;
