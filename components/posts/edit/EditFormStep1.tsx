import { Enum_Post_Contenttype } from '@/graphql/generated';
import { useForm } from 'react-hook-form';
import cs from 'classnames';
import Navigation from '../../layout/Navigation';
import Wysiwyg from '../../Wysiwyg/Wysiwyg';
import { FormData, Step1FormData } from './interface';

interface Props {
  formData: FormData;
  onChange: (formData: Step1FormData) => void;
}

const EditFormStep1 = ({ formData, onChange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm();

  const onSubmit = (step1FormData: Step1FormData) => {
    onChange(step1FormData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Navigation noHide isTransparentBg={false}>
        <li className="nav-item mr-3 d-flex align-items-center">
          <button
            disabled={isSubmitting || !isDirty}
            className="btn btn-success"
          >
            Next
          </button>
        </li>
      </Navigation>

      <div className="container mt-7">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
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
                defaultValue={formData.title}
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
                  value={formData.content}
                  placeholder="Type the content here"
                />
              </div>
              <div className="invalid-feedback">{errors.content?.message}</div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditFormStep1;
