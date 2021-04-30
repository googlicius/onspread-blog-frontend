import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PageHeader from '@/components/layout/PageHeader';
import PostPreview from '@/components/posts/PostPreview';
import Pagination from '@/components/Pagination';
import { Post, usePostsConnectionQuery } from '@/graphql/generated';

interface IProps {
  // data: PostsConnectionQuery;
}

const Posts: FC<IProps> = () => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const { data } = usePostsConnectionQuery({
    variables: {
      start: (+page - 1) * +process.env.NEXT_PUBLIC_PER_PAGE,
    },
  });

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <PageHeader
        heading="Onspread Blog"
        subHeading="A Blog Theme by Start Bootstrap"
      />

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {!data?.postsConnection && <div>Loading...</div>}
            {data?.postsConnection?.values && (
              <>
                {data.postsConnection.values.map(post => (
                  <PostPreview key={post.id} post={post as Post} />
                ))}

                <div className="clearfix" />

                <Pagination
                  currentPage={+page}
                  totalCount={data.postsConnection.aggregate.totalCount}
                  listPath={router.pathname}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
