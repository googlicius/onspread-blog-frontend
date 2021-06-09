import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useCreatePostMutation } from '@/graphql/generated';
import { selectMe } from '@/redux/meProducer';
import EditFormStep1 from '@/components/posts/edit/EditFormStep1';
import EditFormStep2 from '@/components/posts/edit/EditFormStep2';
import { FormData } from '@/components/posts/edit/interface';
import Loading from '@/components/Loading/Loading';

const PostCreate = (): JSX.Element => {
  const router = useRouter();
  const [formDefaultValues, setFormDefaultValues] = useState<FormData>(null);
  const [step, setStep] = useState(1);

  const me = useSelector(selectMe);
  const [createPostMutation] = useCreatePostMutation();
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const checkPageUnSaved = useCallback(() => {
    if (isDirty && !confirm('Do you want to cancel creating?')) {
      router.events.emit('routeChangeComplete');
      throw 'Abort route change. Please ignore this error.';
    }
  }, [isDirty]);

  useEffect(() => {
    setFormDefaultValues({
      content: null,
      contentType: null,
      displayType: null,
      title: null,
      description: null,
      category: null,
    });
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', checkPageUnSaved);

    return function cleanUp() {
      router.events.off('routeChangeStart', checkPageUnSaved);
    };
  }, [checkPageUnSaved]);

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

    router.events.off('routeChangeStart', checkPageUnSaved);
    router.push(`/posts/${createPostData.createPost.post.slug}`);
    toast.dark('Post updated successfully');
  };

  return (
    <>
      <Head>
        <title>Post Create</title>
      </Head>

      {formDefaultValues ? (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              {
                1: (
                  <EditFormStep1
                    defaultValues={formDefaultValues}
                    onNextStep={() => setStep(2)}
                  />
                ),
                2: (
                  <EditFormStep2
                    defaultValues={formDefaultValues}
                    goBack={() => setStep(1)}
                  />
                ),
              }[step]
            }
          </form>
        </FormProvider>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PostCreate;
