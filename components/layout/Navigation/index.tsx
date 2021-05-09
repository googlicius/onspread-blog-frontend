import React, { useEffect, useRef } from 'react';
import { clearLoggedInUser, selectMe } from '@/redux/meProducer';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import cs from 'classnames';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

interface Props {
  isTransparentBg?: boolean;
  children?;
}

export default function Navigation(props: Props): JSX.Element {
  const { isTransparentBg = true, children } = props;
  const navElementRef = useRef<HTMLElement>(null);
  const me = useSelector(selectMe);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_TOKEN_KEY);
    dispatch(clearLoggedInUser());
  };

  // Handle scroll event.
  useEffect(() => {
    let previousTop = 0;
    const headerHeight = navElementRef.current.clientHeight;
    const handleShowHideHeader = () => {
      if (!navElementRef.current) {
        return;
      }

      const currentTop = window.scrollY;
      //if scrolling up...
      if (currentTop === 0 || currentTop < previousTop) {
        if (
          window.scrollY &&
          navElementRef.current.classList.contains('is-fixed')
        ) {
          navElementRef.current.classList.add('is-visible');
        } else {
          // Reached the top
          navElementRef.current.classList.remove('is-visible', 'is-fixed');
          if (isTransparentBg) {
            navElementRef.current.classList.add('transparent-bg');
          }
        }
      } else {
        //if scrolling down...
        navElementRef.current.classList.remove('is-visible', 'transparent-bg');
        if (
          currentTop > headerHeight &&
          !navElementRef.current.classList.contains('is-fixed')
        ) {
          navElementRef.current.classList.add('is-fixed');
        }
      }
      previousTop = currentTop;
    };

    window.removeEventListener('scroll', handleShowHideHeader);
    window.addEventListener('scroll', handleShowHideHeader);

    if (!isTransparentBg && navElementRef.current) {
      navElementRef.current.classList.remove('transparent-bg');
    }

    return function cleanUp() {
      window.removeEventListener('scroll', handleShowHideHeader);
    };
  }, [isTransparentBg]);

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
                  caret={true}
                >
                  {me.value.username}
                </DropdownToggle>

                <DropdownMenu right>
                  <DropdownItem>
                    <Link href="/me">Profile</Link>
                  </DropdownItem>

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
