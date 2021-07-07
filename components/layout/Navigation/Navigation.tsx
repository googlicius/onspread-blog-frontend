import React, { useEffect, useRef } from 'react';
import { clearLoggedInUser, selectMe } from '@/redux/meProducer';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import cs from 'classnames';
import get from 'lodash/get';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import styles from './Navigation.module.scss';
import debounce from 'lodash/debounce';
import { useLogoutMutation } from '@/graphql/generated';
import NotificationSvg from '@/components/svgs/NotificationSvg';

interface Props {
  isTransparentBg?: boolean;
  noHide?: boolean;
  children?;
}

const SCROLL_GAP = 50;

export default function Navigation(props: Props): JSX.Element {
  const { isTransparentBg = false, noHide = false, children } = props;
  const navElementRef = useRef<HTMLElement>(null);
  const me = useSelector(selectMe);
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();
  const { t } = useTranslation();

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
          <UncontrolledDropdown tag="li" className="nav-item mr-2">
            <DropdownToggle tag="a" role="button" className="pointer nav-link">
              <NotificationSvg />
            </DropdownToggle>

            <DropdownMenu right>
              <span className="dropdown-item text-secondary">
                {t('No notification.')}
              </span>
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
                        <a className="nav-link">{t('Login')}</a>
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
