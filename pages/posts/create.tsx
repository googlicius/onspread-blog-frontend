import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Enum_Post_Contenttype,
  Enum_Post_Displaytype,
  useCreatePostMutation,
} from '@/graphql/generated';
import { selectMe } from '@/redux/meProducer';
import EditFormStep1 from '@/components/posts/edit/EditFormStep1';
import EditFormStep2 from '@/components/posts/edit/EditFormStep2';
import { FormData } from '@/components/posts/edit/interface';

const PostCreate = (): JSX.Element => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const me = useSelector(selectMe);
  const [createPostMutation] = useCreatePostMutation();
  const methods = useForm<FormData>({
    defaultValues: {
      title: null,
      content: null,
      contentType: Enum_Post_Contenttype.Html,
      displayType: Enum_Post_Displaytype.WithImage,
      description: null,
      category: null,
    },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const checkUnSavedForm = useCallback(() => {
    if (isDirty && !confirm('Do you want to cancel creating?')) {
      router.events.emit('routeChangeComplete');
      throw 'Abort route change. Please ignore this error.';
    }
  }, [isDirty]);

  useEffect(() => {
    router.events.on('routeChangeStart', checkUnSavedForm);

    return function cleanUp() {
      router.events.off('routeChangeStart', checkUnSavedForm);
    };
  }, [checkUnSavedForm]);

  const onSubmit = async (data: FormData): Promise<void> => {
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

    router.events.off('routeChangeStart', checkUnSavedForm);
    router.push(`/posts/${createPostData.createPost.post.slug}`);
    toast.dark('Post created successfully');
  };

  return (
    <>
      <Head>
        <title>Post Create</title>
      </Head>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            {
              1: <EditFormStep1 onNextStep={() => setStep(2)} />,
              2: <EditFormStep2 goBack={() => setStep(1)} />,
            }[step]
          }
        </form>
      </FormProvider>
    </>
  );
};

export default PostCreate;
