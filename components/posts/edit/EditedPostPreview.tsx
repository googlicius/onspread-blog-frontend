import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Post } from '@/graphql/generated';
import format from 'date-fns/format';
import classNames from 'classnames';
import { FormData } from './interface';
import { useFormContext } from 'react-hook-form';

interface Props {
  post: Post;
  formData: FormData;
}

const EditedPostPreview = ({ post, formData }: Props) => {
  const [editingField, setEditingField] = useState<string>(null);

  const { register, getValues } = useFormContext();

  const thumbnailImage = useMemo(() => {
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
          'flex-row': !post.image,
        })}
      >
        {post.image && (
          <div className="feature-image-wrapper">
            <Link href={`#`}>
              <a>
                <div
                  className="feature-image"
                  style={{
                    backgroundImage: `url(${thumbnailImage})`,
                    backgroundSize: 'cover',
                  }}
                />
              </a>
            </Link>
          </div>
        )}

        <div className="post-preview">
          <a>
            <h2 className="post-title">{formData.title}</h2>
            <h3
              className="post-subtitle"
              onClick={() => editField('description')}
            >
              {editingField === 'description' ? (
                <textarea
                  {...register('description')}
                  autoFocus
                  onBlur={() => editField(null)}
                  className="form-control"
                  defaultValue={formData.description}
                />
              ) : (
                getValues('description') ||
                formData.description || <i>Enter description</i>
              )}
            </h3>
          </a>

          <p className="post-meta">
            Posted by <Link href={'#'}>{post.user?.username}</Link> on{' '}
            {format(
              new Date(post.published_at),
              process.env.NEXT_PUBLIC_DATE_DISPLAY_FORMAT,
            )}
          </p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default EditedPostPreview;
