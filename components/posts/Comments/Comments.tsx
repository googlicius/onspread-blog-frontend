import { CommentsQuery } from '@/graphql/generated';
import formatDistance from 'date-fns/formatDistance';
import cs from 'classnames';
import styles from './Comments.module.scss';
import { useForm } from 'react-hook-form';
import { useCreateCommentMutation } from '@/graphql/generated';
import { useSelector } from 'react-redux';
import { selectMe } from '@/redux/meProducer';
import get from 'lodash/get';

interface Props {
  commentData: CommentsQuery;
  postId: string;
  onCommentSaved: () => void;
}

interface CommentFormData {
  content: string;
}

const Comments = ({ commentData, postId, onCommentSaved }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>();
  const me = useSelector(selectMe);

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
    onCommentSaved();
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

      {commentData?.comments &&
        commentData.comments.map((comment, index) => (
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
                <div className="text-secondary">
                  {formatDistance(new Date(comment.createdAt), new Date())}
                </div>
              </div>
            </div>

            <div className={`${styles.comment__content} my-3`}>
              {comment.content}
            </div>

            <hr />
          </div>
        ))}
    </>
  );
};

export default Comments;
