import Navigation from '@/components/layout/Navigation/Navigation';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
// import cs from 'classnames';
import { FormData, Step2FormData } from './interface';
import EditedPostPreview from './EditedPostPreview';
import { Enum_Post_Displaytype, Post } from '@/graphql/generated';
import Option from '@/types/Option';
import CategorySelect from './CategorySelect';

interface Props {
  post: Post;
  formData: FormData;
  onChange: (formData: Step2FormData) => void;
  goBack: (formData: Step2FormData) => void;
}

const DisplayTypeOptions: Option[] = [
  {
    label: 'Select a type...',
    value: null,
  },
  {
    value: Enum_Post_Displaytype.WithImage,
    label: 'With Image',
  },
  {
    value: Enum_Post_Displaytype.FullscreenImage,
    label: 'Fullscreen Image',
  },
  {
    value: Enum_Post_Displaytype.NoImage,
    label: 'No Image',
  },
];

const EditFormStep2 = ({ post, formData, onChange, goBack }: Props) => {
  const methods = useForm<Step2FormData>();
  const {
    handleSubmit,
    getValues,
    control,
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
              className="btn btn-success btn-sm"
              onClick={handleGoBack}
            >
              Back
            </button>
          </li>

          <li className="nav-item mr-3 d-flex align-items-center">
            <button disabled={isSubmitting} className="btn btn-success btn-sm">
              Save
            </button>
          </li>
        </Navigation>

        <div className="container mt-7">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <h2>Preview</h2>

              <EditedPostPreview post={post} formData={formData} />

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      <strong>Category</strong>
                    </label>
                    <Controller
                      name="category"
                      control={control}
                      defaultValue={getValues('category') || formData.category}
                      render={({ field }) => {
                        const { onChange, ...rest } = field;
                        return (
                          <CategorySelect
                            {...rest}
                            onChange={(data: Option) => {
                              onChange(data.value);
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      <strong>Display Type</strong>
                    </label>
                    <Controller
                      name="displayType"
                      control={control}
                      defaultValue={
                        getValues('displayType') || formData.displayType
                      }
                      render={({ field }) => {
                        const { onChange, value, ...rest } = field;

                        return (
                          <ReactSelect
                            {...rest}
                            value={
                              value &&
                              DisplayTypeOptions.find(
                                (option) => option.value === value,
                              )
                            }
                            onChange={(option) => {
                              onChange(option.value);
                            }}
                            options={DisplayTypeOptions}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditFormStep2;
