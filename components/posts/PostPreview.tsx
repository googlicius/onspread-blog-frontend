import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import { Post } from '@/graphql/generated';
import format from 'date-fns/format';
import styles from './PostPreview.module.scss';

interface Props {
  post: Post;
}

const PostPreview: FC<Props> = ({ post }) => {
  // const thumbnailImage = post.image?.formats?.small?.url || post.image?.url;

  const thumbnailImage = useMemo(() => {
    const path = post.image?.formats?.small?.url || post.image?.url;
    return post.image?.provider === 'local'
      ? process.env.NEXT_PUBLIC_API_ENDPOINT + path
      : path;
  }, [post]);

  return (
    <>
      <div className="d-flex py-5">
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

        {post.image && (
          <div className="col-md-4 pr-0">
            <Link href={`/posts/${post.slug}`}>
              <a>
                <div
                  className={` ${styles['feature-image']}`}
                  style={{
                    backgroundImage: `url(${thumbnailImage})`,
                    backgroundSize: 'cover',
                  }}
                />
              </a>
            </Link>
          </div>
        )}
      </div>
      <hr />
    </>
  );
};

export default PostPreview;
