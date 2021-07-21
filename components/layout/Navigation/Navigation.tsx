import React, { useEffect, useRef } from 'react';
import { clearLoggedInUser, selectMe } from '@/redux/meProducer';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import cs from 'classnames';
import get from 'lodash/get';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import styles from './Navigation.module.scss';
import debounce from 'lodash/debounce';
import { useLogoutMutation, Notification } from '@/graphql/generated';
import NotificationSvg from '@/components/svgs/NotificationSvg';
import HandScissors from '@/components/svgs/HandScissors';
import useNotification from '@/hooks/notification';
import CheckSvg from '@/components/svgs/CheckSvg';

interface Props {
  isTransparentBg?: boolean;
  noHide?: boolean;
  loginText?: string | JSX.Element;
  children?;
}

const SCROLL_GAP = 50;

export default function Navigation(props: Props): JSX.Element {
  const {
    isTransparentBg = false,
    noHide = false,
    loginText = <HandScissors />,
    children,
  } = props;
  const navElementRef = useRef<HTMLElement>(null);
  const me = useSelector(selectMe);
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();
  const { t } = useTranslation();
  const {
    notifications,
    newCount,
    unReadCount,
    markAsSeen,
    markAsRead,
  } = useNotification();

  const handleLogOut = async () => {
    await logoutMutation();
    dispatch(clearLoggedInUser());
  };

  // Handle scroll event.
  useEffect(() => {
    let previousTop = 0;
    const headerHeight = navElementRef.current.clientHeight;

    const handleScrollUp = () => {
      const currentTop = window.scrollY;
      if (currentTop === 0 || currentTop < previousTop) {
        if (
          window.scrollY &&
          navElementRef.current.classList.contains('is-fixed')
        ) {
          // Only visible if a long enough scroll.
          if (previousTop - currentTop >= SCROLL_GAP) {
            navElementRef.current.classList.add('is-visible');
            previousTop = currentTop;
          }
        } else {
          // Reached the top
          navElementRef.current.classList.remove('is-visible', 'is-fixed');
          if (isTransparentBg) {
            navElementRef.current.classList.add('transparent-bg');
          }
        }
      }
    };

    const hanldeScrollDown = () => {
      const currentTop = window.scrollY;

      if (currentTop > previousTop) {
        if (currentTop - previousTop > SCROLL_GAP) {
          // Fix blinking navbar.
          setTimeout(() => {
            navElementRef.current &&
              navElementRef.current.classList.remove(
                'is-visible',
                'transparent-bg',
              );
            previousTop = currentTop;
          }, SCROLL_GAP + 20);
        }

        if (
          currentTop > headerHeight &&
          !navElementRef.current.classList.contains('is-fixed')
        ) {
          navElementRef.current.classList.add('is-fixed');
        }
      }
    };

    const handleScrollDebounced = debounce(() => {
      previousTop = window.scrollY;
    }, 50);

    const handleShowHideHeader = () => {
      if (!navElementRef.current) {
        return;
      }
      handleScrollUp();
      hanldeScrollDown();
      handleScrollDebounced();
    };

    if (!noHide) {
      window.removeEventListener('scroll', handleShowHideHeader);
      window.addEventListener('scroll', handleShowHideHeader);
    }

    if (!isTransparentBg && navElementRef.current) {
      navElementRef.current.classList.remove('transparent-bg');
    }

    return function cleanUp() {
      window.removeEventListener('scroll', handleShowHideHeader);
    };
  }, [isTransparentBg, noHide]);

  const handleNotificationToggle = (e) => {
    const target: HTMLElement = e.target;
    const dropdownEl = target.closest('li.notification-dropdown');
    if (!dropdownEl || dropdownEl.classList.contains('show')) {
      markAsSeen();
    }
  };

  return (
    <nav
      className={cs('navbar navbar-expand-lg navbar-dark bg-dark fixed-top', {
        'transparent-bg': isTransparentBg,
      })}
      ref={navElementRef}
      id="mainNav"
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/">
          <a className="navbar-brand">
            <strong>ONSPREAD</strong>
          </a>
        </Link>
        <div>
          {/* <button className="btn ml-4 p-0">
            <ReactSVG src="/assets/icon/search.svg" />
          </button> */}
        </div>

        <ul className="navbar-nav d-flex align-tems-center flex-row">
          {children}
          {/* Notification */}
          <UncontrolledDropdown
            tag="li"
            className="nav-item mr-2 notification-dropdown"
            onToggle={handleNotificationToggle}
          >
            <DropdownToggle tag="a" role="button" className="pointer nav-link">
              <NotificationSvg title={t('notifications')} />

              {newCount > 0 && (
                <Badge
                  pill
                  color="primary"
                  className={styles['notification-badge']}
                >
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
                      <a
                        role="button"
                        className="px-0"
                        onClick={() => markAsRead()}
                      >
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
                        onClick={() => markAsRead(item as Notification)}
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

          {/* User menu */}
          {/* Use IIFE to performs a switch case in JSX */}
          {(() => {
            switch (me.status) {
              case 'init':
              case 'loading':
                return (
                  <div className="d-flex align-items-center">
                    <div className={cs(styles.navigation__avatar)} />
                  </div>
                );

              case 'idle':
              default:
                if (!me.value) {
                  return (
                    <li className="nav-item">
                      <Link href={`/login`}>
                        <a className="nav-link">{loginText}</a>
                      </Link>
                    </li>
                  );
                }

                return (
                  <UncontrolledDropdown tag="li" className="nav-item">
                    <DropdownToggle
                      tag="a"
                      role="button"
                      className="nav-link px-0"
                    >
                      {/* {me.value.username} */}
                      <div className={cs(styles.navigation__avatar)}>
                        <img
                          src={get(me.value, 'avatar.formats.thumbnail.url')}
                          alt={get(me.value, 'user.avatar.alternativeText')}
                        />
                      </div>
                    </DropdownToggle>

                    <DropdownMenu right>
                      <Link href="/posts/create">
                        <a className="dropdown-item">{t('Create new Post')}</a>
                      </Link>

                      <Link href="/manage-posts?sort=createdAt%3Adesc">
                        <a className="dropdown-item">{t('Manage Posts')}</a>
                      </Link>

                      <Link href="/me">
                        <a className="dropdown-item">{t('Profile')}</a>
                      </Link>

                      <DropdownItem divider />

                      <DropdownItem onClick={handleLogOut}>
                        {t('Logout')}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                );
            }
          })()}
        </ul>
      </div>
    </nav>
  );
}
