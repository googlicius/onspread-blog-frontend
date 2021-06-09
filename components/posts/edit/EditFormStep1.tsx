import { Enum_Post_Contenttype } from '@/graphql/generated';
import { useFormContext } from 'react-hook-form';
import cs from 'classnames';
import Navigation from '../../layout/Navigation/Navigation';
import Wysiwyg from '../../Wysiwyg/Wysiwyg';
import { FormData } from './interface';
import { useRouter } from 'next/router';

interface Props {
  defaultValues: FormData;
  onNextStep: () => void;
}

const EditFormStep1 = ({ defaultValues, onNextStep }: Props) => {
  const {
    register,
    getValues,
    formState: { isSubmitting, errors, isDirty },
    trigger,
  } = useFormContext();
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleNextStep = async () => {
    const result = await trigger(['title', 'content']);
    if (result) {
      onNextStep();
    }
  };

  return (
    <>
      <Navigation noHide isTransparentBg={false}>
        <li className="nav-item mr-3 d-flex align-items-center">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSubmitting || !isDirty}
            className="btn btn-success btn-sm"
            onClick={handleNextStep}
          >
            Next
          </button>
        </li>
      </Navigation>

      <div className="container mt-7">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <h2 className="mb-4">
              {defaultValues.title ? 'Edit Post' : 'Create new Post'}
            </h2>

            <input
              {...register('contentType', { required: true })}
              type="hidden"
              defaultValue={Enum_Post_Contenttype.Html}
            />

            <div className="form-group">
              <label>Title</label>
              <input
                {...register('title', {
                  required: { value: true, message: 'Title is required.' },
                })}
                className={cs('form-control', {
                  'is-invalid': !!errors.title,
                })}
                defaultValue={defaultValues.title}
                placeholder="Title"
              />
              <div className="invalid-feedback">{errors.title?.message}</div>
            </div>

            <div className="form-group">
              <label>Content</label>
              <div
                className={cs({
                  'is-invalid': !!errors.content,
                })}
              >
                <Wysiwyg
                  {...register('content', {
                    required: {
                      value: true,
                      message: 'Content is required.',
                    },
                  })}
                  value={getValues('content') || defaultValues.content}
                  placeholder="Type the content here"
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
