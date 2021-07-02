import { Container, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import client from '@/apollo-client';
import {
  Post,
  PostsConnectionDocument,
  PostsConnectionQuery,
  StoryDocument,
  StoryQuery,
} from '@/graphql/generated';
import Loading from '@/components/Loading/Loading';
import Navigation from '@/components/layout/Navigation/Navigation';
import PostPreview from '@/components/posts/PostPreview';
import cs from 'classnames';
import Pagination from '@/components/Pagination';
import styles from './styles.module.scss';

interface Props {
  postsConnectionData: PostsConnectionQuery;
  storyData: StoryQuery;
}

const Series = ({ postsConnectionData, storyData }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { page = 1 } = router.query;

  return (
    <>
      <Head>
        <title>{t('Seris')} - Onspread</title>
      </Head>

      <Navigation isTransparentBg={false} />

      <div className={cs(styles['story-header-wrapper'], 'mt-7', 'pb-4')}>
        <Container>
          <Row>
            <Col lg={8} md={10} className="mx-auto">
              <h1>{storyData.story.name}</h1>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mb-5 mt-4">
        <Row>
          <Col lg={8} md={10} className="mx-auto">
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

Series.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { query } = ctx;
  const page = query.page || 1;

  const [postsConnectionResult, storyResult] = await Promise.all([
    client.query<PostsConnectionQuery>({
      query: PostsConnectionDocument,
      variables: {
        start: (+page - 1) * +process.env.NEXT_PUBLIC_PER_PAGE,
        sort: 'storySeq:asc',
        where: {
          story: query.id,
          published_at_null: false,
        },
      },
    }),
    client.query<StoryQuery>({
      query: StoryDocument,
      variables: {
        id: query.id,
      },
    }),
  ]);

  return {
    postsConnectionData: postsConnectionResult.data,
    storyData: storyResult.data,
  };
};

export default Series;
