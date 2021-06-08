import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextPageContext } from 'next';
import {
  Post,
  PostBySlugDocument,
  PostBySlugQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/graphql/generated';
import client from '@/apollo-client';
import { selectMe } from '@/redux/meProducer';
import EditFormStep1 from '@/components/posts/edit/EditFormStep1';
import EditFormStep2 from '@/components/posts/edit/EditFormStep2';
import { FormData } from '@/components/posts/edit/interface';
import Loading from '@/components/Loading/Loading';

interface Props {
  postData: PostBySlugQuery;
}

const PostEdit = ({ postData }: Props): JSX.Element => {
  const router = useRouter();
  const [formDefaultValues, setFormDefaultValues] = useState<FormData>(null);
  const [step, setStep] = useState(1);

  const me = useSelector(selectMe);
  const [updatePostMutation] = useUpdatePostMutation();
  const [createPostMutation] = useCreatePostMutation();
  const methods = useForm();
  const { handleSubmit } = methods;

  useEffect(() => {
    // Creating new post...
    if (!postData) {
      return;
    }

    // Editing post...
    if (me.value?.id !== postData.postBySlug?.user?.id) {
      router.back();
    }
  }, [me, postData]);

  useEffect(() => {
    const {
      content = null,
      contentType = null,
      displayType = null,
      title = null,
      description = null,
      category = null,
    } = postData?.postBySlug || {};

    setFormDefaultValues({
      content,
      contentType,
      displayType,
      title,
      description,
      category: category?.id,
    });
  }, [postData]);

  const onSubmit = async (data: FormData): Promise<void> => {
    if (!postData) {
      const { data: createPostData } = await createPostMutation({
        variables: {
          input: {
            data: {
              ...data,
              user: me.value.id,
            },
          },
        },
      });

      router.push(`/posts/${createPostData.createPost.post.slug}`);
    } else {
      const { data: updatePostData } = await updatePostMutation({
        variables: {
          input: {
            where: {
              id: postData.postBySlug.id,
            },
            data,
          },
        },
      });

      router.push(`/posts/${updatePostData.updatePost.post.slug}`);
    }

    toast.dark('Post updated successfully');
  };

  const renderFormByStep = (stepp: number): JSX.Element => {
    switch (stepp) {
      case 1:
        return (
          <EditFormStep1
            defaultValues={formDefaultValues}
            onNextStep={() => setStep(2)}
          />
        );

      case 2:
        return (
          <EditFormStep2
            post={postData?.postBySlug as Post}
            defaultValues={formDefaultValues}
            goBack={() => setStep(1)}
          />
        );
    }
  };

  return (
    <>
      <Head>
        <title>Post Edit</title>
      </Head>

      {formDefaultValues ? (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderFormByStep(step)}
          </form>
        </FormProvider>
      ) : (
        <Loading />
      )}
    </>
  );
};

PostEdit.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { query } = ctx;

  if (!query.slug) {
    return {
      postData: null,
    };
  }

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
