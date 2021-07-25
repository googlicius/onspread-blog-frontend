import {
  Badge,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import Link from 'next/link';
import cs from 'classnames';
import { Notification as NotificationType } from '@/graphql/generated';
import NotificationSvg from '@/components/svgs/NotificationSvg';
import CheckSvg from '@/components/svgs/CheckSvg';
import useNotification from '@/hooks/notification';
import styles from './Notification.module.scss';
import { useTranslation } from 'react-i18next';

const Notification = () => {
  const { t } = useTranslation();
  const {
    notifications,
    newCount,
    unReadCount,
    markAsSeen,
    markAsRead,
  } = useNotification();

  const handleNotificationToggle = (e) => {
    const target: HTMLElement = e.target;
    const dropdownEl = target.closest('li.notification-dropdown');
    if (!dropdownEl || dropdownEl.classList.contains('show')) {
      markAsSeen();
    }
  };

  return (
    <UncontrolledDropdown
      tag="li"
      className="nav-item mr-2 notification-dropdown"
      onToggle={handleNotificationToggle}
    >
      <DropdownToggle tag="a" role="button" className="pointer nav-link">
        <NotificationSvg title={t('notifications')} />

        {newCount > 0 && (
          <Badge pill color="primary" className={styles['notification-badge']}>
            {newCount}
          </Badge>
        )}
      </DropdownToggle>

      <DropdownMenu right className={styles.notifications}>
        {notifications.length === 0 ? (
          <span className="dropdown-item text-secondary">
            {t('No notification.')}
          </span>
        ) : (
          <>
            <div className="px-4 py-2 d-flex justify-content-between align-items-center">
              <strong className="h5 mb-0">{t('Notification')}</strong>

              {unReadCount > 0 && (
                <a role="button" className="px-0" onClick={() => markAsRead()}>
                  <CheckSvg title={t('Mark all as read')} />
                </a>
              )}
            </div>
            {notifications.map((item, index) => (
              <Link href={item.url} key={index}>
                <a
                  className={cs('dropdown-item d-flex', {
                    [styles['notifications__is-unread']]: !item.readAt,
                  })}
                  onClick={() => markAsRead(item as NotificationType)}
                >
                  <div className="flex-grow-1">
                    <div
                      className={styles.notifications__title}
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />

                    {item.message && (
                      <div
                        className={styles.notifications__message}
                        dangerouslySetInnerHTML={{ __html: item.message }}
                      />
                    )}
                  </div>

                  {item.new && (
                    <div className="d-flex flex-column justify-content-center">
                      <div
                        className="badge badge-pill badge-primary ml-2 p-0"
                        style={{ width: 8, height: 8 }}
                      >
                        &nbsp;
                      </div>
                    </div>
                  )}
                </a>
              </Link>
            ))}
          </>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;
