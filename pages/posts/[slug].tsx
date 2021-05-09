import {
  PostBySlugDocument,
  PostBySlugQuery,
  CountPostCommentQuery,
  useCommentsQuery,
  useGiveHeartMutation,
  usePostBySlugQuery,
  CountPostCommentDocument,
} from '@/graphql/generated';
import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import HeartBtn from '@/components/posts/HeartBtn';
import Link from 'next/link';
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

interface ServerProps {
  props: Props;
}

const PostDetail = ({ postData, countCommentData }: Props): JSX.Element => {
  const router = useRouter();
  const [totalHeart, setTotalHeart] = useState(0);
  const { slug } = router.query;
  const [giveHeartMutation] = useGiveHeartMutation();
  const { data = postData } = usePostBySlugQuery({
    variables: {
      slug: slug as string,
    },
    skip: !!postData,
  });
  const { data: commentData, refetch: refetchComments } = useCommentsQuery({
    variables: {
      postId: data.postBySlug.id,
    },
  });
  const me = useSelector(selectMe);

  const isCommentModalOpen = !!router.query['display-comments'];

  const imageUrl = useMemo(() => {
    if (!data?.postBySlug) {
      return '';
    }
    return data.postBySlug.image?.provider === 'local'
      ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}${data.postBySlug.image?.url}`
      : data.postBySlug.image?.url;
  }, [data]);

  const giveHeart = debounce(async (heart: number) => {
    const { data: heartData } = await giveHeartMutation({
      variables: {
        postId: data.postBySlug.id,
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
    if (data?.postBySlug) {
      setTotalHeart(data.postBySlug.heart);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{data?.postBySlug?.title}</title>
        {data?.postBySlug && (
          <>
            <meta property="og:image" content={data.postBySlug.image?.url} />
          </>
        )}
      </Head>

      <Navigation>
        {me.value?.id === data.postBySlug?.user?.id && (
          <li className="nav-item mr-3 d-flex align-items-center">
            <Link href={`/posts/edit?slug=${slug}`}>Edit</Link>
          </li>
        )}
      </Navigation>

      {!data?.postBySlug && <Loading />}

      {data?.postBySlug && (
        <>
          <PageHeader
            heading={data.postBySlug.title}
            imageUrl={`${imageUrl}`}
          />

          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <ReactMarkdown>{data.postBySlug.content}</ReactMarkdown>

                <div className="mt-3 d-flex flex-item-center">
                  <HeartBtn
                    className="pl-0"
                    count={totalHeart || null}
                    onGiveHeart={giveHeart}
                  />
                  <ViewCommentsBtn
                    className="pl-0"
                    count={countCommentData.countPostComment}
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
              Comments ({countCommentData.countPostComment})
            </ModalHeader>

            <ModalBody>
              <Comments
                commentData={commentData}
                postId={postData.postBySlug.id}
                onCommentSaved={refetchComments}
              />
            </ModalBody>
          </Modal>
        </>
      )}
    </>
  );
};

// If you export an async function called getServerSideProps from a page,
// Next.js will pre-render this page on each request using the data
// returned by getServerSideProps.

export async function getServerSideProps({ params }): Promise<ServerProps> {
  const { data: postData } = await client.query<PostBySlugQuery>({
    query: PostBySlugDocument,
    variables: {
      slug: params.slug,
    },
  });

  const { data: countCommentData } = await client.query<CountPostCommentQuery>({
    query: CountPostCommentDocument,
    variables: {
      postId: postData.postBySlug.id,
    },
  });

  return {
    props: {
      postData,
      countCommentData,
    },
  };
}

export default PostDetail;
