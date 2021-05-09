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
import HomeFeaturePosPreview from '@/components/posts/HomeFeaturePosPreview';
import cs from 'classnames';
import Loading from '@/components/Loading/Loading';

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

  const featuredPost = featuredPostData?.featuredPost;

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <Navigation isTransparentBg={!!featuredPost} />

      {featuredPost && <HomeFeaturePosPreview post={featuredPost as Post} />}

      <div
        className={cs('container', {
          'mt-7': page > 1,
        })}
      >
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {!data?.postsConnection && <Loading />}
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
