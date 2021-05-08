import {
  Post,
  useFeaturedPostQuery,
  usePostsConnectionQuery,
} from '@/graphql/generated';
import Head from 'next/head';
import Navigation from '@/components/layout/Navigation';
import Pagination from '@/components/Pagination';
import PostPreview from '@/components/posts/PostPreview';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import HomeFeaturePosPreview from '@/components/posts/HomeFeaturePosPreview';

const Home = () => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const { data } = usePostsConnectionQuery({
    variables: {
      start: (+page - 1) * +process.env.NEXT_PUBLIC_PER_PAGE,
    },
  });
  const { data: featuredPostData } = useFeaturedPostQuery({
    skip: page > 1,
  });

  const featuredPost = get(featuredPostData, 'featuredPost');

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <Navigation isDark={!featuredPost} />

      {featuredPost && <HomeFeaturePosPreview post={featuredPost as Post} />}

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {!data?.postsConnection && <div>Loading...</div>}
            {data?.postsConnection?.values && (
              <>
                {data.postsConnection.values.map((post) => (
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

export default Home;
