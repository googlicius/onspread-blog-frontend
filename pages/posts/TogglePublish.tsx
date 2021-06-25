import { Post } from '@/graphql/generated';
import {
  usePublishPostMutation,
  useUnPublishPostMutation,
} from '@/graphql/generated';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Props {
  post?: Post;
}

const TogglePublish = ({ post }: Props): JSX.Element => {
  const [isPublished, setIsPublished] = useState(!!post?.published_at);
  const [
    publishPostMutation,
    { loading: pulishLoading },
  ] = usePublishPostMutation();
  const [
    unPublishPostMutation,
    { loading: unPublishLoading },
  ] = useUnPublishPostMutation();
  const { t } = useTranslation();

  const handlePublish = async (): Promise<void> => {
    try {
      await publishPostMutation({
        variables: {
          id: post.id,
        },
      });
      setIsPublished(true);
      toast.info('Published.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUnPublish = async (): Promise<void> => {
    try {
      await unPublishPostMutation({
        variables: {
          id: post.id,
        },
      });
      setIsPublished(false);
      toast.info('Unpublished.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {!isPublished ? (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={pulishLoading || unPublishLoading}
          onClick={handlePublish}
        >
          {t('Publish')}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={pulishLoading || unPublishLoading}
          onClick={handleUnPublish}
        >
          {t('Unpublish')}
        </button>
      )}
    </>
  );
};

export default TogglePublish;
