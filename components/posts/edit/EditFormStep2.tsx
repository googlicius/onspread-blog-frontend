import Navigation from '@/components/layout/Navigation';
import { FormProvider, useForm } from 'react-hook-form';
// import cs from 'classnames';
import { FormData, Step2FormData } from './interface';
import EditedPostPreview from './EditedPostPreview';
import { Post } from '@/graphql/generated';

interface Props {
  post: Post;
  formData: FormData;
  onChange: (formData: Step2FormData) => void;
  goBack: (formData: Step2FormData) => void;
}

const EditFormStep2 = ({ post, formData, onChange, goBack }: Props) => {
  const methods = useForm();
  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (step2FormData: Step2FormData) => {
    onChange(step2FormData);
  };

  const handleGoBack = () => {
    goBack(getValues());
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Navigation noHide isTransparentBg={false}>
          <li className="nav-item mr-3 d-flex align-items-center">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleGoBack}
            >
              Back
            </button>
          </li>

          <li className="nav-item mr-3 d-flex align-items-center">
            <button disabled={isSubmitting} className="btn btn-success">
              Save
            </button>
          </li>
        </Navigation>

        <div className="container mt-7">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <h2>Preview</h2>

              <EditedPostPreview post={post} formData={formData} />

              {/* <div className="form-group">
                <label>Description</label>
                <input
                  {...register('description', {
                    required: {
                      value: true,
                      message: 'Description is required.',
                    },
                  })}
                  className={cs('form-control', {
                    'is-invalid': !!errors.description,
                  })}
                  defaultValue={formData.description}
                  placeholder="Description"
                />
                <div className="invalid-feedback">
                  {errors.description?.message}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditFormStep2;
