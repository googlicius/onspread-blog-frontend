import Head from 'next/head';
import { NextPageContext } from 'next';
import { PostBySlugDocument, PostBySlugQuery } from '@/graphql/generated';
import client from '@/apollo-client';
import { useSelector } from 'react-redux';
import { selectMe } from '@/redux/meProducer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import EditFormStep1 from '@/components/posts/EditFormStep1';

interface Props {
  postData: PostBySlugQuery;
}

const PostEdit = ({ postData }: Props) => {
  const router = useRouter();

  const me = useSelector(selectMe);

  const handleStep1DataChange = (formData) => {
    //
  };

  useEffect(() => {
    if (me.value?.id !== postData.postBySlug?.user?.id) {
      router.back();
    }
  }, [me, postData]);

  return (
    <>
      <Head>
        <title>Post Edit</title>
      </Head>

      <EditFormStep1 postData={postData} onChange={handleStep1DataChange} />
    </>
  );
};

PostEdit.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { query } = ctx;
  const { data: postData } = await client.query<PostBySlugQuery>({
    query: PostBySlugDocument,
    variables: {
      slug: query.slug,
    },
  });

  return {
    postData,
  };
};

export default PostEdit;
