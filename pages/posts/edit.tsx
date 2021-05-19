import Head from 'next/head';
import Navigation from '@/components/layout/Navigation';
import Wysiwyg from '@/components/Wysiwyg/Wysiwyg';
import { NextPageContext } from 'next';
import {
  Enum_Post_Contenttype,
  PostBySlugDocument,
  PostBySlugQuery,
  useUpdatePostMutation,
} from '@/graphql/generated';
import client from '@/apollo-client';
import { useForm } from 'react-hook-form';
import cs from 'classnames';
import { useSelector } from 'react-redux';
import { selectMe } from '@/redux/meProducer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
  postData: PostBySlugQuery;
}

interface FormData {
  title: string;
  content: string;
  contentType: Enum_Post_Contenttype;
}

const PostEdit = ({ postData }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm();
  const [updatePostMutation, { loading }] = useUpdatePostMutation();

  const me = useSelector(selectMe);

  const onSubmit = (formData: FormData) => {
    updatePostMutation({
      variables: {
        input: {
          where: {
            id: postData.postBySlug.id,
          },
          data: {
            ...formData,
          },
        },
      },
    });
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Navigation noHide isTransparentBg={false}>
          <li className="nav-item mr-3 d-flex align-items-center">
            <button
              disabled={isSubmitting || loading || !isDirty}
              className="btn btn-success"
            >
              Save
            </button>
          </li>
        </Navigation>

        <div className="container mt-7">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <input
                {...register('contentType', { required: true })}
                type="hidden"
                defaultValue={Enum_Post_Contenttype.Html}
              />
              <div className="form-group">
                <label>Title</label>
                <input
                  {...register('title', {
                    required: { value: true, message: 'Title is required.' },
                  })}
                  className={cs('form-control', {
                    'is-invalid': !!errors.title,
                  })}
                  defaultValue={postData.postBySlug.title}
                  placeholder="Title"
                />
                <div className="invalid-feedback">{errors.title?.message}</div>
              </div>

              <div className="form-group">
                <label>Content</label>
                <div
                  className={cs({
                    'is-invalid': !!errors.content,
                  })}
                >
                  <Wysiwyg
                    {...register('content', {
                      required: {
                        value: true,
                        message: 'Content is required.',
                      },
                    })}
                    value={postData.postBySlug.content}
                    placeholder="Type the content here"
                  />
                </div>
                <div className="invalid-feedback">
                  {errors.content?.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
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
