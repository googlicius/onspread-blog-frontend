import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextPageContext } from 'next';
import map from 'lodash/map';
import {
  Post,
  PostBySlugDocument,
  PostBySlugQuery,
  useUpdatePostMutation,
} from '@/graphql/generated';
import client from '@/configs/apollo-client';
import EditFormStep1 from '@/components/posts/edit/EditFormStep1';
import EditFormStep2 from '@/components/posts/edit/EditFormStep2';
import { FormData } from '@/components/posts/edit/interface';
import { useTranslation } from 'react-i18next';
import useFormGuard from '@/hooks/form-guard';
import displayTypeOptions from '@/utils/display-type-options';
import Option from '@/types/Option';
import get from 'lodash/get';

interface Props {
  postData: PostBySlugQuery;
}

const PostEdit = ({ postData }: Props): JSX.Element => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { postBySlug } = postData;
  const { t } = useTranslation();

  const [updatePostMutation] = useUpdatePostMutation();

  const displayType: Option = useMemo(() => {
    return displayTypeOptions(t).find(
      (option) => option.value === postBySlug.displayType,
    );
  }, [postBySlug]);

  const methods = useForm<FormData>({
    defaultValues: {
      content: postBySlug.content,
      image: postBySlug.image?.id,
      contentType: postBySlug.contentType,
      displayType,
      title: postBySlug.title,
      description: postBySlug.description,
      category: postBySlug.category.id,
      story: postBySlug.story && {
        label: postBySlug.story.name,
        value: postBySlug.story.id,
      },
      storySeq: postBySlug.storySeq,
      tags: map(postBySlug.tags, (tag) => ({
        label: tag.name,
        value: tag.id,
      })),
    },
  });
  const { handleSubmit, formState } = methods;

  const { me, checkUnSavedForm } = useFormGuard({
    isDirty: formState.isDirty,
    isEditForm: true,
  });

  useEffect(() => {
    // Return because user is loading...
    if (me.status !== 'idle') {
      return;
    }

    if (me.value?.id !== postData.postBySlug?.user?.id) {
      router.back();
    }
  }, [me, postData]);

  const onSubmit = async (data: FormData): Promise<void> => {
    const { data: updatePostData } = await updatePostMutation({
      variables: {
        input: {
          where: {
            id: postData.postBySlug.id,
          },
          data: {
            ...data,
            story: get(data.story, 'value'),
            displayType: get(data.displayType, 'value'),
            tags: map(data.tags, 'value'),
          },
        },
      },
    });

    router.events.off('routeChangeStart', checkUnSavedForm);
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
