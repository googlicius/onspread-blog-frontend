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
import client from '@/apollo-client';
import debounce from 'lodash/debounce';
import { selectMe } from '@/redux/meProducer';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import formatDistance from 'date-fns/formatDistance';
import styles from './PostDetail.module.scss';
import cs from 'classnames';

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
  const { data: commentData } = useCommentsQuery({
    variables: {
      postId: data.postBySlug.id,
    },
  });
  const me = useSelector(selectMe);

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

  useEffect(() => {
    if (data?.postBySlug) {
      setTotalHeart(data.postBySlug.heart);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{data?.postBySlug?.title}</title>
      </Head>

      <Navigation>
        {me.value?.id === data.postBySlug?.user?.id && (
          <li className="nav-item mr-3 d-flex align-items-center">
            <Link href={`/posts/edit?slug=${slug}`}>Edit</Link>
          </li>
        )}
      </Navigation>

      {!data?.postBySlug && <div>Loading...</div>}

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
                    data-bs-toggle="modal"
                    data-bs-target="#commentModal"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal right fade"
            id="commentModal"
            role="dialog"
            aria-labelledby="myModalLabel"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Comments ({countCommentData.countPostComment})</h3>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <ReactSVG src="/assets/icon/close.svg" />
                  </button>
                </div>

                <div className="modal-body">
                  <div className="mt-3">
                    <input
                      placeholder="Share your thought"
                      className="form-control"
                    />

                    <hr className="mt-5" />
                  </div>

                  {commentData?.comments &&
                    commentData.comments.map((comment, index) => (
                      <div key={index} className={styles.comment}>
                        <div className={cs(styles.comment__user, 'd-flex')}>
                          <div className={`${styles.avatar} mr-3`}></div>
                          <div className="username">
                            {comment.user.username}
                            <div className="text-secondary">
                              {formatDistance(
                                new Date(comment.createdAt),
                                new Date(),
                              )}
                            </div>
                          </div>
                        </div>

                        <div className={`${styles.comment__content} my-3`}>
                          {comment.content}
                        </div>

                        <hr />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
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
