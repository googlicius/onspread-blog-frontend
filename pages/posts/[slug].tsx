import React, { useEffect, useMemo, useState } from 'react';
import { Modal, ModalBody, ModalHeader, Row, Col, Container } from 'reactstrap';
import {
  PostBySlugDocument,
  PostBySlugQuery,
  CountPostCommentQuery,
  useGiveHeartMutation,
  CountPostCommentDocument,
  Enum_Post_Contenttype,
  Enum_Post_Displaytype,
  Post,
} from '@/graphql/generated';
import Head from 'next/head';
import cs from 'classnames';
import HeartBtn from '@/components/posts/HeartBtn';
import Link from 'next/link';
import { NextPageContext } from 'next';
import Navigation from '@/components/layout/Navigation/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import ReactMarkdown from 'react-markdown';
import ViewCommentsBtn from '@/components/posts/ViewCommentsBtn';
import Comments from '@/components/posts/Comments/Comments';
import client from '@/apollo-client';
import debounce from 'lodash/debounce';
import { selectMe } from '@/redux/meProducer';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import Loading from '@/components/Loading/Loading';
import styles from './PostDetail.module.scss';
import postStyles from '@/styles/scss/modules/post.module.scss';
import format from 'date-fns/format';
import get from 'lodash/get';
import TogglePublish from './TogglePublish';
import { useTranslation } from 'react-i18next';
import PostPreview from '@/components/posts/PostPreview';
import PencilSvg from '@/components/svgs/PencilSvg';

interface Props {
  postData: PostBySlugQuery;
  countCommentData: CountPostCommentQuery;
}

const PostDetail = (props: Props): JSX.Element => {
  const { postData, countCommentData } = props;
  const router = useRouter();
  const [totalHeart, setTotalHeart] = useState(0);
  const { slug } = router.query;
  const [giveHeartMutation] = useGiveHeartMutation();
  const { t } = useTranslation();

  const me = useSelector(selectMe);

  const isCommentModalOpen = !!router.query['display-comments'];

  useEffect(() => {
    if (postData?.postBySlug) {
      setTotalHeart(postData.postBySlug.heart);
    }
  }, [postData]);

  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = false;
      state.options.shallow = true;
      return true;
    });

    return function cleanUp() {
      router.beforePopState(() => {
        return true;
      });
    };
  }, []);

  const imageUrl = useMemo(() => {
    const theImageUrl = postData.postBySlug.image?.url;

    if (!postData?.postBySlug || !theImageUrl) {
      return '';
    }

    return postData.postBySlug.image?.provider === 'local'
      ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}${theImageUrl}`
      : theImageUrl;
  }, [postData]);

  const giveHeart = debounce(async (heart: number) => {
    const { data: heartData } = await giveHeartMutation({
      variables: {
        postId: postData.postBySlug.id,
        heart,
      },
    });
    setTotalHeart(heartData.giveHeart);
  }, 1000);

  const toggleCommentModal = () => {
    if (isCommentModalOpen) {
      router.back();
    } else {
      router.push(`/posts/${slug}?display-comments=1`, undefined, {
        shallow: true,
      });
    }
  };

  // useEffect(() => {
  //   if (iframely) {
  //     document.querySelectorAll('oembed[url]').forEach((element) => {
  //       iframely.load(element, element.attributes['url'].value);
  //     });
  //   }
  // }, [data]);

  return (
    <>
      <Head>
        <title>{postData?.postBySlug?.title}</title>
        {postData?.postBySlug && (
          <>
            <meta
              property="og:image"
              content={postData.postBySlug.image?.url}
            />
          </>
        )}
      </Head>

      <Navigation
        isTransparentBg={
          !!imageUrl &&
          postData.postBySlug.displayType ===
            Enum_Post_Displaytype.FullscreenImage
        }
      >
        {me.value?.id === postData.postBySlug?.user?.id && (
          <>
            <li className="nav-item mr-3 d-flex align-items-center">
              <Link href={`/posts/${slug}/edit`}>
                <a>
                  <PencilSvg title={t('Edit')} />
                </a>
              </Link>
            </li>

            <li className="nav-item mr-3 d-flex align-items-center">
              <TogglePublish post={postData.postBySlug as Post} />
            </li>
          </>
        )}
      </Navigation>

      {!postData.postBySlug && <Loading />}

      {postData.postBySlug && (
        <>
          {imageUrl &&
            postData.postBySlug.displayType ===
              Enum_Post_Displaytype.FullscreenImage && (
              <PageHeader
                heading={postData.postBySlug.title}
                imageUrl={`${imageUrl}`}
              />
            )}

          <div className="container mb-5">
            <Row>
              <Col lg={8} md={10} className="mx-auto">
                <div className={styles.post}>
                  {postData.postBySlug.displayType !==
                    Enum_Post_Displaytype.FullscreenImage && (
                    <h1 className={cs(styles.post__title, 'mt-7', 'mb-4')}>
                      {postData.postBySlug.title}
                    </h1>
                  )}

                  {/* Author info and published date */}
                  <div className="d-flex mb-4 align-items-center">
                    <div className={`${styles['post__user-avatar']} mr-3`}>
                      <img
                        src={get(
                          postData.postBySlug,
                          'user.avatar.formats.thumbnail.url',
                        )}
                        alt={get(
                          postData.postBySlug,
                          'user.avatar.alternativeText',
                        )}
                      />
                    </div>

                    <strong className="mr-3">
                      <Link href={'#'}>
                        {postData.postBySlug.user?.username}
                      </Link>
                    </strong>

                    <small>
                      {format(
                        new Date(postData.postBySlug.published_at),
                        process.env.NEXT_PUBLIC_DATE_DISPLAY_FORMAT,
                      )}
                    </small>
                  </div>

                  {imageUrl &&
                    postData.postBySlug.displayType ===
                      Enum_Post_Displaytype.WithImage && (
                      <img className="mb-4" src={imageUrl} />
                    )}

                  {postData.postBySlug.contentType ===
                  Enum_Post_Contenttype.Html ? (
                    <div
                      className={postStyles['post-content']}
                      dangerouslySetInnerHTML={{
                        __html: postData.postBySlug.content,
                      }}
                    />
                  ) : (
                    <ReactMarkdown className={postStyles['post-content']}>
                      {postData.postBySlug.content}
                    </ReactMarkdown>
                  )}
                </div>

                <div className="mt-3 d-flex flex-item-center">
                  <HeartBtn
                    className="pl-0"
                    count={totalHeart || null}
                    onGiveHeart={giveHeart}
                  />
                  <ViewCommentsBtn
                    className="pl-0"
                    count={countCommentData?.countPostComment}
                    onClick={toggleCommentModal}
                  />
                </div>
              </Col>
            </Row>
          </div>

          {postData.postBySlug.nextPost &&
            (() => {
              const { name, id } = postData.postBySlug.story;
              return (
                <div className={cs(styles['next-post-wrapper'], 'py-5')}>
                  <Container>
                    <Row>
                      <Col lg={8} md={10} className="mx-auto">
                        <strong>
                          <Link href={`/series/${id}`}>{name}</Link> -{' '}
                          {t('Next post')}
                        </strong>

                        <PostPreview
                          post={postData.postBySlug.nextPost as Post}
                        />
                      </Col>
                    </Row>
                  </Container>
                </div>
              );
            })()}

          <Modal
            isOpen={isCommentModalOpen}
            modalClassName="right"
            toggle={toggleCommentModal}
          >
            <ModalHeader
              tag="h5"
              close={
                <button
                  type="button"
                  className="close"
                  onClick={toggleCommentModal}
                >
                  <ReactSVG src="/assets/icon/close.svg" />
                </button>
              }
            >
              {t('Comments')} ({countCommentData?.countPostComment})
            </ModalHeader>

            <ModalBody>
              <Comments postId={postData?.postBySlug.id} />
            </ModalBody>
          </Modal>
        </>
      )}
    </>
  );
};

PostDetail.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { query } = ctx;
  const { data: postData } = await client.query<PostBySlugQuery>({
    query: PostBySlugDocument,
    variables: {
      slug: query.slug,
    },
  });

  const { data: countCommentData } = await client.query<CountPostCommentQuery>({
    query: CountPostCommentDocument,
    variables: {
      postId: postData.postBySlug.id,
    },
  });

  return {
    postData,
    countCommentData,
  };
};

export default PostDetail;
