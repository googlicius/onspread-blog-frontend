import {
  PostBySlugDocument,
  PostBySlugQuery,
  CountPostCommentQuery,
  useGiveHeartMutation,
  CountPostCommentDocument,
  Enum_Post_Contenttype,
} from '@/graphql/generated';
import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import HeartBtn from '@/components/posts/HeartBtn';
import Link from 'next/link';
import { NextPageContext } from 'next';
import Navigation from '@/components/layout/Navigation';
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
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Loading from '@/components/Loading/Loading';

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

  const me = useSelector(selectMe);

  const isCommentModalOpen = !!router.query['display-comments'];

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

      <Navigation>
        {me.value?.id === postData.postBySlug?.user?.id && (
          <li className="nav-item mr-3 d-flex align-items-center">
            <Link
              href={`/posts/edit?slug=${encodeURIComponent(slug as string)}`}
            >
              Edit
            </Link>
          </li>
        )}
      </Navigation>

      {!postData.postBySlug && <Loading />}

      {postData.postBySlug && (
        <>
          <PageHeader
            heading={postData.postBySlug.title}
            imageUrl={`${imageUrl}`}
          />

          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                {postData.postBySlug.contentType ===
                Enum_Post_Contenttype.Html ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: postData.postBySlug.content,
                    }}
                  />
                ) : (
                  <ReactMarkdown>{postData.postBySlug.content}</ReactMarkdown>
                )}

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
              </div>
            </div>
          </div>

          <Modal
            isOpen={isCommentModalOpen}
            modalClassName="right"
            toggle={toggleCommentModal}
          >
            <ModalHeader
              tag="h3"
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
              Comments ({countCommentData?.countPostComment})
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
