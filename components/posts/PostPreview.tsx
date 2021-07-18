import React, { useMemo } from 'react';
import Link from 'next/link';
import { Post, Tag } from '@/graphql/generated';
import format from 'date-fns/format';
import classNames from 'classnames';
import TagLinks from './TagLinks/TagLinks';

interface Props {
  post: Post;
  displayBorder?: boolean;
}

const PostPreview = ({ post, displayBorder = false }: Props) => {
  const thumbnailImage = useMemo(() => {
    const path = post.image?.formats?.small?.url || post.image?.url;
    return post.image?.provider === 'local'
      ? process.env.NEXT_PUBLIC_API_ENDPOINT + path
      : path;
  }, [post]);

  return (
    <>
      <div
        className={classNames('d-flex post-preview-container', {
          'flex-row': !post.image,
        })}
      >
        {post.image && (
          <div className="feature-image-wrapper">
            <Link href={`/posts/${post.slug}`}>
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
          <Link href={`/posts/${encodeURIComponent(post.slug)}`}>
            <a>
              <h2 className="post-title">{post.title}</h2>
              <h3 className="post-subtitle">{post.description}</h3>
            </a>
          </Link>

          {/* Tags */}
          <TagLinks tags={post.tags as Tag[]} className="mb-1" />

          <small className="post-meta">
            Posted by <Link href={'#'}>{post.user?.username}</Link> on{' '}
            {format(
              new Date(post.published_at),
              process.env.NEXT_PUBLIC_DATE_DISPLAY_FORMAT,
            )}
          </small>
        </div>
      </div>
      {displayBorder && <hr className="my-0" />}
    </>
  );
};

export default PostPreview;
