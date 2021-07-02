import { useEffect, useMemo, useState } from 'react';
import Navigation from '@/components/layout/Navigation/Navigation';
import { Controller, useFormContext } from 'react-hook-form';
import { Col, Row, FormGroup } from 'reactstrap';
import ReactSelect from 'react-select';
import cs from 'classnames';
import { FormData } from './interface';
import EdittingPostPreview from './EdittingPostPreview';
import {
  Enum_Post_Displaytype,
  Post,
  UploadFile,
  usePostsByStoryQuery,
} from '@/graphql/generated';
import Option from '@/types/Option';
import CategorySelect from './CategorySelect/CategorySelect';
import MediaLib from '@/components/Wysiwyg/MediaLib/MediaLib';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import StorySelect from './StorySelect/StorySelect';
import getTime from 'date-fns/getTime';
import PostSequence from './PostSequence/PostSequence';

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
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<FormData>();
  const { t } = useTranslation();
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);
  const storyId = watch('story');

  const { data: postsByStoryData } = usePostsByStoryQuery({
    variables: {
      story: storyId,
    },
    skip: !storyId,
    fetchPolicy: 'network-only',
  });

  const postsByStory: Post[] = useMemo(() => {
    const posts: Post[] = [];

    if (postsByStoryData) {
      posts.push(...(postsByStoryData.posts as Post[]));
    }

    if (storyId !== post.story?.id) {
      posts.push(post);
    }

    return posts;
  }, [postsByStoryData, storyId]);

  useEffect(() => {
    if (storyId) {
      setValue('storySeq', getTime(new Date()));
    }
  }, [storyId]);

  const handleMediaChange = (data: UploadFile) => {
    setValue('image', data.id);
  };

  const handleToggleMediaLib = () => {
    setIsMediaLibOpen((prev) => !prev);
  };

  const handleSequenceChanged = (seq: number) => {
    setValue('storySeq', seq);
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
        <Row>
          <div className="col-lg-8 col-md-10 mx-auto">
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
                        message: t('Category is required.'),
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
                      const { onChange, value, ...rest } = field;
                      const selectedOption =
                        value &&
                        DisplayTypeOptions.find(
                          (option) => option.value === value,
                        );

                      return (
                        <ReactSelect
                          {...rest}
                          value={selectedOption}
                          onChange={(option) => {
                            onChange(option.value);
                          }}
                          options={DisplayTypeOptions}
                        />
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
                      const { onChange, ...rest } = field;
                      return (
                        <StorySelect
                          {...rest}
                          onChange={(data: Option) => {
                            onChange(data.value);
                          }}
                        />
                      );
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>

            {storyId && (
              <Row className="mt-3">
                <Col md={12}>
                  <h4>{t('Posts of series')}</h4>

                  <PostSequence
                    posts={postsByStory}
                    editingPost={post}
                    onSequenceChanged={handleSequenceChanged}
                  />
                </Col>
              </Row>
            )}
          </div>
        </Row>
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
