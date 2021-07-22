import { useEffect, useMemo, useState } from 'react';
import {
  useNotificationsConnectionLazyQuery,
  Notification,
  useMarkAsSeenMutation,
  useMarkAsReadMutation,
} from '@/graphql/generated';
import { useSelector } from 'react-redux';
import { selectMe } from '@/redux/meProducer';
import { selectSocket } from '@/redux/socketIOReducer';

interface UseNotificationReturn {
  notifications: Partial<Notification>[];
  loading: boolean;
  newCount: number;
  unReadCount: number;
  markAsSeen: () => void;
  markAsRead: (notification?: Notification) => void;
}

/**
 * Notification hook, load notifications by current user.
 * Display real-time notification via socket.o client.
 */
const useNotification = (): UseNotificationReturn => {
  const [newNotifications, setNewNotifications] = useState<
    Partial<Notification>[]
  >([]);
  const me = useSelector(selectMe);
  const socketState = useSelector(selectSocket);
  const [
    notificationsConnectionQuery,
    { data, loading, refetch },
  ] = useNotificationsConnectionLazyQuery();

  const [markAsSeenMutation] = useMarkAsSeenMutation();
  const [markAsReadMutation] = useMarkAsReadMutation();

  useEffect(() => {
    if (!me.value) {
      return;
    }

    notificationsConnectionQuery({
      variables: {
        where: {
          user: me.value.id,
          isVisible: true,
        },
      },
    });
  }, [me]);

  useEffect(() => {
    if (socketState.isLoaded) {
      socketState.value.on('notification', (data) => {
        setNewNotifications((prev) => [data, ...prev]);
      });
    }
  }, [socketState]);

  const notifications: Partial<Notification>[] = useMemo(() => {
    if (!data) {
      return newNotifications;
    }
    return [...newNotifications, ...data.notificationsConnection.values];
  }, [newNotifications, data]);

  const newCount = useMemo(() => {
    return notifications.filter((item) => item.new).length;
  }, [notifications]);

  const unReadCount = useMemo(() => {
    return notifications.filter((item) => !item.readAt).length;
  }, [notifications]);

  /**
   * Mark all new notifications as seen.
   */
  const markAsSeen = async () => {
    if (me.value && newCount > 0) {
      await markAsSeenMutation({
        variables: {
          user: me.value.id,
        },
      });
      await refetch();
      setNewNotifications([]);
    }
  };

  /**
   * Mark all or one notification as read.
   */
  const markAsRead = async (notification?: Notification) => {
    if (me.value) {
      await markAsReadMutation({
        variables: {
          user: me.value.id,
          ...(notification && !notification.readAt && { id: notification.id }),
        },
      });
      refetch();
      setNewNotifications([]);
    }
  };

  return {
    loading,
    notifications,
    newCount,
    unReadCount,
    markAsSeen,
    markAsRead,
  };
};

export default useNotification;
