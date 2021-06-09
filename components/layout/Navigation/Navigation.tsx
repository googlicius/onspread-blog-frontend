import React, { useEffect, useRef } from 'react';
import { clearLoggedInUser, selectMe } from '@/redux/meProducer';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
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

interface Props {
  isTransparentBg?: boolean;
  noHide?: boolean;
  children?;
}

export default function Navigation(props: Props): JSX.Element {
  const { isTransparentBg = true, noHide = false, children } = props;
  const navElementRef = useRef<HTMLElement>(null);
  const me = useSelector(selectMe);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_TOKEN_KEY);
    dispatch(clearLoggedInUser());
  };

  // Handle scroll event.
  useEffect(() => {
    let previousTop1 = 0;
    let previousTop2 = 0;
    const headerHeight = navElementRef.current.clientHeight;

    const handleScrollUp = debounce(() => {
      const currentTop = window.scrollY;
      if (currentTop === 0 || currentTop < previousTop1) {
        if (
          window.scrollY &&
          navElementRef.current.classList.contains('is-fixed')
        ) {
          // Only visible if a long enough scroll.
          previousTop1 - currentTop >= 50 &&
            navElementRef.current.classList.add('is-visible');
        } else {
          // Reached the top
          navElementRef.current.classList.remove('is-visible', 'is-fixed');
          if (isTransparentBg) {
            navElementRef.current.classList.add('transparent-bg');
          }
        }
      }
      previousTop1 = currentTop;
    }, 20);

    const hanldeScrollDown = () => {
      const currentTop = window.scrollY;

      if (currentTop > 0 && currentTop >= previousTop2) {
        // Fix blinking navbar.
        setTimeout(() => {
          navElementRef.current.classList.remove(
            'is-visible',
            'transparent-bg',
          );
        }, 50);

        if (
          currentTop > headerHeight &&
          // currentTop - previousTop > 50 &&
          !navElementRef.current.classList.contains('is-fixed')
        ) {
          navElementRef.current.classList.add('is-fixed');
        }
      }
      previousTop2 = currentTop;
    };

    const handleShowHideHeader = () => {
      if (!navElementRef.current) {
        return;
      }
      handleScrollUp();
      hanldeScrollDown();
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
          {me.value ? (
            <>
              <UncontrolledDropdown tag="li" className="nav-item">
                <DropdownToggle
                  tag="a"
                  role="button"
                  className="pointer nav-link pr-0"
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
                    <a className="dropdown-item">Create new Post</a>
                  </Link>

                  <Link href="/me">
                    <a className="dropdown-item">Profile</a>
                  </Link>

                  <DropdownItem onClick={handleLogOut}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          ) : (
            <li className="nav-item">
              <Link href={`/login`}>
                <a className="nav-link">Login</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
