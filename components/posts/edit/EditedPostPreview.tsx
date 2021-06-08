import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';
import classNames from 'classnames';
import format from 'date-fns/format';
import { Post } from '@/graphql/generated';
import { FormData } from './interface';

interface Props {
  post?: Post;
  defaultValues: FormData;
}

const EditedPostPreview = ({ post, defaultValues }: Props) => {
  const [editingField, setEditingField] = useState<string>(null);

  const { register, getValues } = useFormContext();

  const thumbnailImage = useMemo(() => {
    if (!post) {
      return null;
    }

    const path = post.image?.formats?.small?.url || post.image?.url;
    return post.image?.provider === 'local'
      ? process.env.NEXT_PUBLIC_API_ENDPOINT + path
      : path;
  }, [post]);

  const editField = (fieldName: string) => {
    setEditingField(fieldName);
  };

  return (
    <>
      <div
        className={classNames('d-flex post-preview-container', {
          'flex-row': !post?.image,
        })}
      >
        {post?.image && (
          <div className="feature-image-wrapper">
            <a>
              <div
                className="feature-image"
                style={{
                  backgroundImage: `url(${thumbnailImage})`,
                  backgroundSize: 'cover',
                }}
              />
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
                  defaultValue={defaultValues.description}
                />
              ) : (
                getValues('description') ||
                defaultValues.description || <i>Enter description</i>
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

export default EditedPostPreview;
