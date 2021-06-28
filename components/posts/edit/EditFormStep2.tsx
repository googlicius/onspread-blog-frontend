import { useState } from 'react';
import Navigation from '@/components/layout/Navigation/Navigation';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';
import cs from 'classnames';
import { FormData } from './interface';
import EdittingPostPreview from './EdittingPostPreview';
import { Enum_Post_Displaytype, Post, UploadFile } from '@/graphql/generated';
import Option from '@/types/Option';
import CategorySelect from './CategorySelect';
import MediaLib from '@/components/Wysiwyg/MediaLib/MediaLib';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface Props {
  post?: Post;
  goBack: () => void;
}

const displayTypeOptions = (t: TFunction): Option[] => [
  {
    label: t('Select a type...'),
    value: null,
  },
  {
    label: t('With Image'),
    value: Enum_Post_Displaytype.WithImage,
  },
  {
    label: t('Fullscreen Image'),
    value: Enum_Post_Displaytype.FullscreenImage,
  },
  {
    label: t('No Image'),
    value: Enum_Post_Displaytype.NoImage,
  },
];

const EditFormStep2 = ({ post, goBack }: Props) => {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext<FormData>();
  const { t } = useTranslation();
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);

  const handleMediaChange = (data: UploadFile) => {
    setValue('image', data.id);
  };

  const handleToggleMediaLib = () => {
    setIsMediaLibOpen((prev) => !prev);
  };

  const DisplayTypeOptions = displayTypeOptions(t);

  return (
    <>
      <Navigation noHide isTransparentBg={false}>
        <li className="nav-item mr-3 d-flex align-items-center">
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={goBack}
          >
            {t('Back')}
          </button>

          <button disabled={isSubmitting} className="btn btn-success btn-sm">
            {t('Save')}
          </button>
        </li>
      </Navigation>

      <div className="container mt-7">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <h2>{t('Preview')}</h2>

            <EdittingPostPreview
              post={post}
              openMediaLib={handleToggleMediaLib}
            />

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    <strong>{t('Category')}</strong>
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: t('Category is required.'),
                      },
                    }}
                    render={({ field }) => {
                      const { onChange, ...rest } = field;
                      return (
                        <CategorySelect
                          {...rest}
                          className={cs({
                            'is-invalid': !!errors.category,
                          })}
                          styles={{
                            control: (style) => ({
                              ...style,
                              borderColor: errors.category
                                ? 'red'
                                : style.borderColor,
                            }),
                          }}
                          onChange={(data: Option) => {
                            onChange(data.value);
                          }}
                        />
                      );
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.category?.message}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    <strong>{t('Display Type')}</strong>
                  </label>
                  <Controller
                    name="displayType"
                    control={control}
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

      <MediaLib
        isOpen={isMediaLibOpen}
        toggle={() => setIsMediaLibOpen(!isMediaLibOpen)}
        onChange={handleMediaChange}
      />
    </>
  );
};

export default EditFormStep2;
