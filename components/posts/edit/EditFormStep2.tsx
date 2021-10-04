import { useRef } from 'react';
import Navigation from '@/components/layout/Navigation/Navigation';
import { Controller, useFormContext } from 'react-hook-form';
import { Col, Row, FormGroup, Container } from 'reactstrap';
import ReactSelect from 'react-select';
import cs from 'classnames';
import { FormData } from './interface';
import EdittingPostPreview from './EdittingPostPreview';
import { Post, UploadFile } from '@/graphql/generated';
import Option from '@/types/Option';
import CategorySelect from './CategorySelect/CategorySelect';
import MediaLib, { MediaLibRef } from '@/components/MediaLib/MediaLib';
import { useTranslation } from 'react-i18next';
import StorySelect from './StorySelect/StorySelect';
import TagSelect from './TagSelect/TagSelect';
import PostSequence from './PostSequence/PostSequence';
import displayTypeOptions from '@/utils/display-type-options';

interface Props {
  post?: Post;
  goBack: () => void;
}

const EditFormStep2 = ({ post, goBack }: Props) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<FormData>();
  const { t } = useTranslation();
  const mediaLibRef = useRef<MediaLibRef>(null);
  const storyOption = watch('story');

  const handleMediaChange = (data: UploadFile) => {
    setValue('image', data.id);
  };

  const handleSequenceChanged = (seq: number) => {
    setValue('storySeq', seq);
  };

  const handleToggleMediaLib = () => {
    mediaLibRef.current.toggleOpen();
  };

  const DisplayTypeOptions = displayTypeOptions(t);

  return (
    <>
      <Navigation noHide>
        <li className="nav-item mr-3 d-flex align-items-center">
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={goBack}
          >
            {t('Back')}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-success btn-sm"
          >
            {t('Save')}
          </button>
        </li>
      </Navigation>

      <Container className="mt-7">
        <Row>
          <Col lg={8} md={10} className="mx-auto">
            <h2>{t('Preview')}</h2>

            <EdittingPostPreview
              post={post}
              openMediaLib={handleToggleMediaLib}
            />

            <Row className="mb-3">
              <Col md={12}>
                <h4>{t('Post information')}</h4>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <label>
                    <strong>{t('Category')}</strong>
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: t('requiredMessage', { name: t('Category') }),
                      },
                    }}
                    render={({ field }) => {
                      const { onChange, ...rest } = field;
                      return (
                        <CategorySelect
                          {...rest}
                          className={cs({ 'is-invalid': !!errors.category })}
                          // Red border when the field is invalid.
                          styles={{
                            control: (style) => ({
                              ...style,
                              borderColor: errors.category
                                ? 'red'
                                : style.borderColor,
                            }),
                          }}
                          onChange={(option: Option) => {
                            onChange(option.value);
                          }}
                        />
                      );
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.category?.message}
                  </div>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <label>
                    <strong>{t('Display Type')}</strong>
                  </label>
                  <Controller
                    name="displayType"
                    control={control}
                    render={({ field }) => {
                      return (
                        <ReactSelect {...field} options={DisplayTypeOptions} />
                      );
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <label>
                    <strong>{t('Series')}</strong>
                  </label>

                  <Controller
                    name="story"
                    control={control}
                    render={({ field }) => {
                      return <StorySelect {...field} />;
                    }}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <label>
                    <strong>{t('Tags')}</strong>
                  </label>

                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => {
                      return <TagSelect {...field} isMulti />;
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>

            {storyOption?.value && (
              <Row className="mt-3">
                <Col md={12}>
                  <h4>{t('Posts of series')}</h4>

                  <PostSequence
                    post={post}
                    selectedStoryOption={storyOption}
                    onSequenceChanged={handleSequenceChanged}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      <MediaLib ref={mediaLibRef} onChange={handleMediaChange} />
    </>
  );
};

export default EditFormStep2;
