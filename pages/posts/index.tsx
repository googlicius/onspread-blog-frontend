import Head from 'next/head';
import { FC } from 'react';
import client from '@/apollo-client';
import PageHeader from '@/components/layout/PageHeader';
import PostPreview from '@/components/posts/PostPreview';
import {
  Post,
  PostsConnectionQuery,
  PostsConnectionDocument,
  usePostsConnectionQuery,
} from '@/graphql/generated';
import Link from 'next/link';

interface IProps {
  data: PostsConnectionQuery;
}

const Posts: FC<IProps> = ({ data: serverData }) => {
  const { data = serverData } = usePostsConnectionQuery({
    skip: !!serverData,
  });

  if (!data.postsConnection) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <PageHeader heading="Onspread Blog" />

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {data.postsConnection.values &&
              data.postsConnection.values.map(post => (
                <PostPreview key={post.id} post={post as Post} />
              ))}

            <div className="clearfix">
              <Link href="#!">
                <a className="btn btn-primary float-right">Older Posts →</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  const { data } = await client.query<PostsConnectionQuery>({
    query: PostsConnectionDocument,
  });

  return {
    props: {
      data,
    },
  };
}

export default Posts;
