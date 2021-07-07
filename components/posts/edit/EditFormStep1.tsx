import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cs from 'classnames';
import Navigation from '../../layout/Navigation/Navigation';
import Wysiwyg from '../../Wysiwyg/Wysiwyg';
import { FormData } from './interface';
import { useRouter } from 'next/router';
import postStyles from '@/styles/scss/modules/post.module.scss';

interface Props {
  title: string;
  onNextStep: () => void;
}

const EditFormStep1 = ({ title, onNextStep }: Props) => {
  const {
    register,
    getValues,
    formState: { isSubmitting, errors, isDirty },
    trigger,
  } = useFormContext<FormData>();
  const router = useRouter();
  const { t } = useTranslation();

  const handleNextStep = async () => {
    const result = await trigger(['title', 'content']);
    if (result) {
      onNextStep();
    }
  };

  return (
    <>
      <Navigation noHide>
        <li className="nav-item mr-3 d-flex align-items-center">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={router.back}
          >
            {t('Cancel')}
          </button>

          <button
            type="button"
            disabled={isSubmitting || !isDirty}
            className="btn btn-success btn-sm"
            onClick={handleNextStep}
          >
            {t('Next')}
          </button>
        </li>
      </Navigation>

      <div className="container mt-7">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <h2 className="mb-4">{title}</h2>

            <input
              {...register('contentType', { required: true })}
              type="hidden"
            />

            <div className="form-group">
              <label>{t('Title')}</label>
              <input
                {...register('title', {
                  required: {
                    value: true,
                    message: t('requiredMessage', { name: t('Title') }),
                  },
                })}
                className={cs('form-control', 'shadow-none', {
                  'is-invalid': !!errors.title,
                })}
                placeholder={t('Title')}
              />
              <div className="invalid-feedback">{errors.title?.message}</div>
            </div>

            <div className="form-group">
              <label>{t('Content')}</label>
              <div
                className={cs(postStyles['post-content'], {
                  'is-invalid': !!errors.content,
                })}
              >
                <Wysiwyg
                  {...register('content', {
                    required: {
                      value: true,
                      message: t('requiredMessage', { name: t('Content') }),
                    },
                  })}
                  value={getValues('content')}
                  config={{ placeholder: t('Type the content here') }}
                />
              </div>
              <div className="invalid-feedback">{errors.content?.message}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFormStep1;
