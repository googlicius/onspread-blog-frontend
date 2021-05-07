import {
  PostBySlugDocument,
  PostBySlugQuery,
  useGiveHeartMutation,
  usePostBySlugQuery,
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

interface Props {
  data: PostBySlugQuery;
}

const PostDetail = ({ data: serverData }: Props): JSX.Element => {
  const router = useRouter();
  const [totalHeart, setTotalHeart] = useState(0);
  const { slug } = router.query;
  const [giveHeartMutation] = useGiveHeartMutation();
  const { data = serverData } = usePostBySlugQuery({
    variables: {
      slug: slug as string,
    },
    skip: !!serverData,
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
          <li className="nav-item mr-3">
            <Link href={`/posts/edit?slug=${slug}`}>
              <a className="nav-link">Edit</a>
            </Link>
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
                  <ViewCommentsBtn className="pl-0" count={3} />
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

interface ServerProps {
  props: {
    data: PostBySlugQuery;
  };
}

export async function getServerSideProps({ params }): Promise<ServerProps> {
  const { data } = await client.query<PostBySlugQuery>({
    query: PostBySlugDocument,
    variables: {
      slug: params.slug,
    },
  });

  return {
    props: {
      data,
    },
  };
}

export default PostDetail;
