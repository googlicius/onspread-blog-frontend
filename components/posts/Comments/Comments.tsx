import { useCommentsQuery } from '@/graphql/generated';
import formatDistance from 'date-fns/formatDistance';
import cs from 'classnames';
import styles from './Comments.module.scss';
import { useForm } from 'react-hook-form';
import { useCreateCommentMutation } from '@/graphql/generated';
import { useSelector } from 'react-redux';
import { selectMe } from '@/redux/meProducer';
import get from 'lodash/get';

interface Props {
  postId: string;
}

interface CommentFormData {
  content: string;
}

const Comments = ({ postId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>();
  const me = useSelector(selectMe);

  const { data, refetch } = useCommentsQuery({
    variables: {
      postId,
    },
  });

  const [createCommentMutation] = useCreateCommentMutation();

  const onSubmit = async (formData: CommentFormData) => {
    if (!me.value) {
      return;
    }

    await createCommentMutation({
      variables: {
        input: {
          data: {
            content: formData.content,
            post: postId,
            user: me.value.id,
          },
        },
      },
    });

    reset();
    refetch();
  };

  return (
    <>
      <div className="mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              {...register('content', {
                required: { value: true, message: 'Content is required' },
              })}
              disabled={isSubmitting}
              placeholder="Share your thought"
              className={cs('form-control', {
                'is-invalid': !!errors.content,
              })}
            />
            <div className="invalid-feedback">{errors.content?.message}</div>
          </div>
        </form>

        <hr className="mt-5" />
      </div>

      {data?.comments && data?.comments.length > 0 ? (
        data.comments.map((comment, index) => (
          <div key={index} className={styles.comment}>
            <div className={cs(styles.comment__user, 'd-flex')}>
              <div className={`${styles.avatar} mr-3`}>
                <img
                  src={get(comment, 'user.avatar.formats.thumbnail.url')}
                  alt={get(comment, 'user.avatar.alternativeText')}
                />
              </div>
              <div className="username">
                {comment.user.username}
                <div className="text-secondary small">
                  {formatDistance(new Date(comment.createdAt), new Date())}
                </div>
              </div>
            </div>

            <div
              className={`${styles.comment__content} my-3`}
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}
            ></div>

            <hr />
          </div>
        ))
      ) : (
        <i className={styles.comment__empty}>There is no comment yet</i>
      )}
    </>
  );
};

export default Comments;
