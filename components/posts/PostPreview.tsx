import React, { FC } from 'react';
import Link from 'next/link';
import { Post } from '@/graphql/generated';
import format from 'date-fns/format';

interface IProps {
  post: Post;
}

const PostPreview: FC<IProps> = ({ post }) => {
  return (
    <>
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
      <hr />
    </>
  );
};

export default PostPreview;
