import { FC, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import PageHeader from '@/components/layout/PageHeader';
import client from '@/apollo-client';
import {
  PostBySlugDocument,
  PostBySlugQuery,
  useGiveHeartMutation,
  usePostBySlugQuery,
} from '@/graphql/generated';
import ViewCommentsBtn from '@/components/posts/ViewCommentsBtn';
import HeartBtn from '@/components/posts/HeartBtn';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import { selectMe } from '@/redux/meProducer';
import debounce from 'lodash/debounce';

interface IProps {
  data: PostBySlugQuery;
}

const PostDetail: FC<IProps> = ({ data: serverData }) => {
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
    if (data) {
      setTotalHeart(data.postBySlug.heart);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{data?.postBySlug?.title}</title>
      </Head>

      <Navigation />

      {!data?.postBySlug && <div>Loading...</div>}

      {data?.postBySlug && (
        <>
          <PageHeader heading={data.postBySlug.title} />

          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                {me?.id === data.postBySlug.user?.id && (
                  <Link href={`/posts/edit?slug=${slug}`}>
                    <a className="d-flex">
                      <ReactSVG src="/assets/icon/edit.svg" className="mr-3" />
                      <span>Edit</span>
                    </a>
                  </Link>
                )}
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
export async function getServerSideProps({ params }) {
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
