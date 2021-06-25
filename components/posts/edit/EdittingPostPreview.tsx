import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';
import classNames from 'classnames';
import format from 'date-fns/format';
import {
  Enum_Post_Displaytype,
  Post,
  useFilesQuery,
} from '@/graphql/generated';
import { FormData } from './interface';
import styles from './EdittingPostPreview.module.scss';
import cs from 'classnames';
import TrashSvg from '@/components/svgs/TrashSvg';
import { useTranslation } from 'react-i18next';

interface Props {
  post?: Post;
  openMediaLib: () => void;
}

const EdittingPostPreview = ({ post, openMediaLib }: Props) => {
  const [editingField, setEditingField] = useState<string>(null);
  const { register, watch, getValues, setValue } = useFormContext<FormData>();
  const { t } = useTranslation();
  const displayType = watch('displayType');
  const image = watch('image');

  const { data } = useFilesQuery({
    variables: {
      limit: 1,
      where: {
        id: image,
      },
    },
    skip: !image,
  });

  const thumbnailImage = useMemo(() => {
    if (!data || data.files.length === 0) {
      return null;
    }

    const image = data.files[0];

    const path = image?.formats?.small?.url || image?.url;
    return image?.provider === 'local'
      ? process.env.NEXT_PUBLIC_API_ENDPOINT + path
      : path;
  }, [data]);

  const editField = (fieldName: string) => {
    setEditingField(fieldName);
  };

  const handleDeleteImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setValue('image', null);
  };

  return (
    <>
      <div
        className={classNames('d-flex post-preview-container', {
          'flex-row': displayType === Enum_Post_Displaytype.NoImage,
        })}
      >
        {displayType && displayType !== Enum_Post_Displaytype.NoImage && (
          <div className="feature-image-wrapper">
            <a role="button" onClick={openMediaLib}>
              {thumbnailImage && (
                <div
                  className="feature-image relative"
                  style={{
                    backgroundImage: `url(${thumbnailImage})`,
                    backgroundSize: 'cover',
                  }}
                >
                  <div className={cs(styles.buttons)}>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleDeleteImage}
                    >
                      <TrashSvg />
                    </button>
                  </div>
                </div>
              )}

              {!thumbnailImage && (
                <div
                  className={cs(
                    'd-flex',
                    'align-items-center',
                    'justify-content-center',
                    styles['feature-image'],
                  )}
                >
                  <span className="text-light">
                    {t('Click to select an image.')}
                  </span>
                </div>
              )}
            </a>
          </div>
        )}

        <div className="post-preview">
          <a>
            <h2 className="post-title">{getValues('title')}</h2>
            <h3
              className="post-subtitle"
              onClick={() => editField('description')}
            >
              {editingField === 'description' ? (
                <textarea
                  {...register('description')}
                  autoFocus
                  rows={4}
                  onBlur={() => editField(null)}
                  className="form-control"
                />
              ) : (
                getValues('description') || <i>{t('Enter description')}</i>
              )}
            </h3>
          </a>

          {post && (
            <p className="post-meta">
              Posted by <Link href={'#'}>{post.user?.username}</Link> on{' '}
              {format(
                new Date(post.published_at),
                process.env.NEXT_PUBLIC_DATE_DISPLAY_FORMAT,
              )}
            </p>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default EdittingPostPreview;
