import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import PageHeader from '@/components/layout/PageHeader';
import client from '@/apollo-client';
import {
  PostBySlugDocument,
  PostBySlugQuery,
  usePostBySlugQuery,
} from '@/graphql/generated';

interface IProps {
  data: PostBySlugQuery;
}

const PostDetail: FC<IProps> = ({ data: serverData }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { data = serverData } = usePostBySlugQuery({
    variables: {
      slug: slug as string,
    },
    skip: !!serverData,
  });

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      {!data?.postBySlug && <div>Loading...</div>}

      {data?.postBySlug && (
        <>
          <PageHeader heading={data.postBySlug.title} />

          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <ReactMarkdown>{data.postBySlug.content}</ReactMarkdown>
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
