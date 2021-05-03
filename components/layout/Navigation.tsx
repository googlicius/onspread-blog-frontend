import { useEffect, useRef } from 'react';
import Link from 'next/link';
import cs from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoggedInUser, selectMe } from '@/redux/meProducer';

const MQL = 992;

interface IProps {
  isDark?: boolean;
}

export default function Navigation(props: IProps) {
  const navElementRef = useRef<HTMLElement>(null);
  const me = useSelector(selectMe);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_TOKEN_KEY);
    dispatch(clearLoggedInUser());
  };

  // Handle scroll event.
  useEffect(() => {
    if (props.isDark) {
      return;
    }

    let previousTop = 0;
    const headerHeight = navElementRef.current.clientHeight;
    const handleShowHideHeader = () => {
      if (!navElementRef.current) {
        return;
      }

      const currentTop = window.scrollY;
      //if scrolling up...
      if (currentTop < previousTop) {
        if (
          window.scrollY &&
          navElementRef.current.classList.contains('is-fixed')
        ) {
          navElementRef.current.classList.add('is-visible');
        } else {
          navElementRef.current.classList.remove('is-visible', 'is-fixed');
        }
      } else {
        //if scrolling down...
        navElementRef.current.classList.remove('is-visible');
        if (
          currentTop > headerHeight &&
          !navElementRef.current.classList.contains('is-fixed')
        ) {
          navElementRef.current.classList.add('is-fixed');
        }
      }
      previousTop = currentTop;
    };

    if (window.innerWidth > MQL) {
      window.addEventListener('scroll', handleShowHideHeader);
    }

    return function cleanUp() {
      window.removeEventListener('scroll', handleShowHideHeader);
    };
  }, []);

  return (
    <nav
      className={cs(
        'navbar',
        'navbar-expand-lg',
        {
          'navbar-light fixed-top': !props.isDark,
        },
        {
          'navbar-dark bg-dark': props.isDark,
        },
      )}
      ref={navElementRef}
      id="mainNav"
    >
      <div className="container">
        <Link href="/posts">
          <a className="navbar-brand">
            <strong>ONSPREAD</strong>
          </a>
        </Link>

        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            {me ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle pr-0"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    href="#"
                  >
                    {me.username}
                  </a>

                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogOut}
                    >
                      Logout
                    </a>
                  </div>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href={`/login`}>
                  <a className="nav-link">Login</a>
                </Link>
              </li>
            )}

            {/* <li className="nav-item">
              <a className="nav-link" href="about.html">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="post.html">
                Sample Post
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contact.html">
                Contact
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
