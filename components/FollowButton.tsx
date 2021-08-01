import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Enum_Subscription_Collectionname,
  useCreateSubscriptionMutation,
  useSubscriptionByUserAndCollectionQuery,
  useDeleteSubscriptionMutation,
} from '@/graphql/generated';
import { selectMe } from '@/redux/meProducer';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  collectionName: Enum_Subscription_Collectionname;
  collectionId: string;
  outline?: boolean;
}

const FollowButton = forwardRef<HTMLButtonElement, Props>(
  ({ collectionId, collectionName, outline = false, ...rest }, ref) => {
    const { t } = useTranslation();
    const me = useSelector(selectMe);
    const router = useRouter();
    const {
      data: subscriptionData,
      loading: loading1,
      refetch,
    } = useSubscriptionByUserAndCollectionQuery({
      variables: {
        user: me.value?.id,
        collectionName,
        collectionId,
      },
      skip: !me.value,
    });

    const subscription = subscriptionData?.subscriptionByUserAndCollection;

    const [
      createSubscriptionMutation,
      { loading: loading2 },
    ] = useCreateSubscriptionMutation({
      onCompleted() {
        refetch();
      },
    });

    const [
      deleteSubscriptionMutation,
      { loading: loading3 },
    ] = useDeleteSubscriptionMutation({
      onCompleted() {
        refetch();
      },
    });

    /**
     * Hanldle subscription and unscription.
     */
    const handleStorySubscription = () => {
      if (!me.value) {
        router.push(`/login?back=1`);
        return;
      }

      if (!subscription) {
        createSubscriptionMutation({
          variables: {
            input: {
              data: {
                user: me.value?.id,
                collectionId,
                collectionName,
              },
            },
          },
        });
      } else {
        deleteSubscriptionMutation({
          variables: {
            input: {
              where: {
                id: subscription.id,
              },
            },
          },
        });
      }
    };

    return (
      <Button
        {...rest}
        innerRef={ref}
        type="button"
        outline={outline}
        disabled={loading1 || loading2 || loading3}
        color={!subscription ? 'secondary' : 'danger'}
        onClick={handleStorySubscription}
      >
        {!subscription ? t('Follow') : t('Unfollow')}
      </Button>
    );
  },
);

FollowButton.displayName = 'FollowButton';

const CollectionNameType = PropTypes.oneOf(
  Object.values(
    Enum_Subscription_Collectionname,
  ) as Enum_Subscription_Collectionname[],
);

FollowButton.propTypes = {
  collectionName: CollectionNameType.isRequired,
  collectionId: PropTypes.string.isRequired,
  outline: PropTypes.bool,
};

export default FollowButton;
