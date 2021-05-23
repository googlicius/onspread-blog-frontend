import React, { useMemo } from 'react';
import Link from 'next/link';
import cs from 'classnames';
import PropTypes from 'prop-types';

interface Props {
  currentPage: number;
  totalCount: number;
  listPath: string;
  perPage?: number;
}

const Pagination = ({
  perPage = +process.env.NEXT_PUBLIC_PER_PAGE,
  currentPage,
  totalCount,
  listPath,
}: Props) => {
  const pages = useMemo(() => {
    const totalPages = Math.ceil(totalCount / perPage);
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalCount, perPage]);

  return (
    <nav className="mt-5" aria-label="Page navigation">
      <ul className="pagination pagination-lg justify-content-end">
        {currentPage > 1 && (
          <li className="page-item">
            <Link href={`${listPath}?page=${currentPage - 1}`}>
              <a className="page-link">Previous</a>
            </Link>
          </li>
        )}
        {pages.map((page) => (
          <li
            className={cs('page-item', { active: page === currentPage })}
            key={page}
          >
            <Link href={`${listPath}?page=${page}`}>
              <a className="page-link">{page}</a>
            </Link>
          </li>
        ))}
        {currentPage < pages.length && (
          <li className="page-item">
            <Link href={`${listPath}?page=${currentPage + 1}`}>
              <a className="page-link">Next</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  listPath: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  perPage: PropTypes.number,
};

export default Pagination;
