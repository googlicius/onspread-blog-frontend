import { useCallback, useEffect, useState } from 'react';
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
  useUpdatePostMutation,
} from '@/graphql/generated';
import client from '@/apollo-client';
import { selectMe } from '@/redux/meProducer';
import EditFormStep1 from '@/components/posts/edit/EditFormStep1';
import EditFormStep2 from '@/components/posts/edit/EditFormStep2';
import { FormData } from '@/components/posts/edit/interface';
import { useTranslation } from 'react-i18next';

interface Props {
  postData: PostBySlugQuery;
}

const PostEdit = ({ postData }: Props): JSX.Element => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { postBySlug } = postData;
  const { t } = useTranslation();

  const me = useSelector(selectMe);
  const [updatePostMutation] = useUpdatePostMutation();
  const methods = useForm<FormData>({
    defaultValues: {
      content: postBySlug.content,
      image: postBySlug.image?.id,
      contentType: postBySlug.contentType,
      displayType: postBySlug.displayType,
      title: postBySlug.title,
      description: postBySlug.description,
      category: postBySlug.category.id,
      story: postBySlug.story?.id,
      storySeq: postBySlug.storySeq,
    },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const checkPageUnSaved = useCallback(() => {
    if (isDirty && !confirm(t('Do you want to cancel editing?'))) {
      router.events.emit('routeChangeComplete');
      throw 'Abort route change. Please ignore this error.';
    }
  }, [isDirty]);

  useEffect(() => {
    // Return because user is loading...
    if (me.status !== 'idle') {
      return;
    }

    if (!me.value) {
      router.events.off('routeChangeStart', checkPageUnSaved);
      router.push('/');
      return;
    }

    if (me.value?.id !== postData.postBySlug?.user?.id) {
      router.back();
    }
  }, [me, postData]);

  useEffect(() => {
    router.events.on('routeChangeStart', checkPageUnSaved);

    return function cleanUp() {
      router.events.off('routeChangeStart', checkPageUnSaved);
    };
  }, [checkPageUnSaved]);

  const onSubmit = async (data: FormData): Promise<void> => {
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

    router.events.off('routeChangeStart', checkPageUnSaved);
    router.push(`/posts/${updatePostData.updatePost.post.slug}`);
    toast.dark(t('Post updated successfully.'));
  };

  return (
    <>
      <Head>
        <title>{t('Post Edit')}</title>
      </Head>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            {
              1: (
                <EditFormStep1
                  title={t('Edit Post')}
                  onNextStep={() => setStep(2)}
                />
              ),
              2: (
                <EditFormStep2
                  post={postData?.postBySlug as Post}
                  goBack={() => setStep(1)}
                />
              ),
            }[step]
          }
        </form>
      </FormProvider>
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
