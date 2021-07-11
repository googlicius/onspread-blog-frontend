import { Container, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import cs from 'classnames';
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
import Pagination from '@/components/Pagination';
import { selectMe } from '@/redux/meProducer';
import PencilSvg from '@/components/svgs/PencilSvg';
import styles from './styles.module.scss';

interface Props {
  postsConnectionData: PostsConnectionQuery;
  storyData: StoryQuery;
}

const Series = ({ postsConnectionData, storyData }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const me = useSelector(selectMe);
  const { page = 1, id } = router.query;

  return (
    <>
      <Head>
        <title>
          {t('Series')} {storyData.story.name} - Onspread
        </title>
      </Head>

      <Navigation />

      <div className={cs(styles['story-header-wrapper'], 'mt-7', 'pb-4')}>
        <Container>
          <Row>
            <Col lg={8} md={10} className="mx-auto">
              <strong>{t('Series')}</strong>
              <h1>
                {storyData.story.name}{' '}
                {me.value?.id === storyData.story.user?.id && (
                  <Link href={`/series/${id}/edit`}>
                    <a>
                      <PencilSvg />
                    </a>
                  </Link>
                )}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: storyData.story.description,
                }}
              />
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
