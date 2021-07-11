import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

interface Props {
  currentPage: number;
  totalCount: number;
  listPath?: string;
  perPage?: number;
  className?: string;
  onNavigate?: (page: number) => void;
}

const Pagination = ({
  className = 'mt-5',
  perPage = +process.env.NEXT_PUBLIC_PER_PAGE,
  currentPage,
  totalCount,
  listPath = '',
  onNavigate,
}: Props) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalCount / perPage);

  const pages = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  const router = useRouter();

  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.target.href;

    if (onNavigate) {
      const url = new URL(href);
      onNavigate(parseInt(url.searchParams.get('page')));
    } else {
      router.push(href);
    }
  };

  if (totalPages === 1) {
    return null;
  }

  return (
    <nav className={className} aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        <li
          className={cs('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            className="page-link shadow-none"
            href={`${listPath}?page=${currentPage - 1}`}
            onClick={handleLinkClick}
          >
            {t('pagination:Prev')}
          </a>
        </li>

        {pages.map((page) => (
          <li
            className={cs('page-item', { active: page === currentPage })}
            key={page}
          >
            <a
              className="page-link shadow-none"
              href={`${listPath}?page=${page}`}
              onClick={handleLinkClick}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cs('page-item', {
            disabled: currentPage === pages.length,
          })}
        >
          <a
            className="page-link shadow-none"
            href={`${listPath}?page=${currentPage + 1}`}
            onClick={handleLinkClick}
          >
            {t('pagination:Next')}
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  listPath: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  onNavigate: PropTypes.func,
};

export default Pagination;
