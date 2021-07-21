import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import cs from 'classnames';
import {
  FeaturedPostDocument,
  FeaturedPostQuery,
  Post,
  PostsConnectionDocument,
  PostsConnectionQuery,
} from '@/graphql/generated';
import Navigation from '@/components/layout/Navigation/Navigation';
import Pagination from '@/components/Pagination';
import PostPreview from '@/components/posts/PostPreview';
import HomeFeaturePosPreview from '@/components/posts/HomeFeaturePosPreview';
import Loading from '@/components/Loading/Loading';
import client from '@/configs/apollo-client';
import { useTranslation } from 'react-i18next';

interface Props {
  postsConnectionData: PostsConnectionQuery;
  featuredPostData?: FeaturedPostQuery;
}

const Home = ({ postsConnectionData, featuredPostData }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { page = 1 } = router.query;
  const featuredPost = featuredPostData?.featuredPost;

  return (
    <>
      <Head>
        <title>{t('Home')} - Onspread</title>
      </Head>

      <Navigation isTransparentBg={!!featuredPost} />

      {featuredPost && <HomeFeaturePosPreview post={featuredPost as Post} />}

      <div
        className={cs('container mb-5', {
          'mt-7': page > 1,
        })}
      >
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {!postsConnectionData?.postsConnection && <Loading />}
            {postsConnectionData?.postsConnection?.values && (
              <>
                {postsConnectionData.postsConnection.values.map((post) => (
                  <PostPreview
                    key={post.id}
                    post={post as Post}
                    displayBorder
                  />
                ))}

                <div className="clearfix" />

                <Pagination
                  currentPage={+page}
                  totalCount={
                    postsConnectionData.postsConnection.aggregate.count
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// `getInitialProps` enables server-side rendering in a page and allows you
// to do initial data population, it means sending the page with the data
// already populated from the server. This is especially useful for SEO.

Home.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { query } = ctx;
  const page = query.page || 1;

  const [postsConnectionResult, featuredPostResult] = await Promise.all([
    client.query<PostsConnectionQuery>({
      query: PostsConnectionDocument,
      variables: {
        start: (+page - 1) * +process.env.NEXT_PUBLIC_PER_PAGE,
        where: {
          published_at_null: false,
        },
      },
    }),
    client.query<FeaturedPostQuery>({
      query: FeaturedPostDocument,
      // We don't need to fetch featured post from page 2 afterward.
      fetchPolicy: +page === 1 ? 'cache-first' : 'standby',
    }),
  ]);

  return {
    postsConnectionData: postsConnectionResult.data,
    featuredPostData: featuredPostResult?.data,
  };
};

export default Home;
