import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import { Post } from '@/graphql/generated';
import format from 'date-fns/format';
import styles from './PostPreview.module.scss';
import classNames from 'classnames';

interface Props {
  post: Post;
}

const PostPreview: FC<Props> = ({ post }) => {
  const thumbnailImage = useMemo(() => {
    const path = post.image?.formats?.small?.url || post.image?.url;
    return post.image?.provider === 'local'
      ? process.env.NEXT_PUBLIC_API_ENDPOINT + path
      : path;
  }, [post]);

  return (
    <>
      <div
        className={classNames(`d-flex ${styles['post-preview-container']}`, {
          'flex-row': !post.image,
        })}
      >
        {post.image && (
          <div className={styles['feature-image-wrapper']}>
            <Link href={`/posts/${post.slug}`}>
              <a>
                <div
                  className={styles['feature-image']}
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
          <Link href={`/posts/${post.slug}`}>
            <a>
              <h2 className="post-title">{post.title}</h2>
              <h3 className="post-subtitle">{post.description}</h3>
            </a>
          </Link>

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

export default PostPreview;