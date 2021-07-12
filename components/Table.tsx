import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable, Column, useSortBy } from 'react-table';
import { useRouter } from 'next/router';
import buildUrl from '@/utils/build-url';

const buildSortBy = (strSort: string) => {
  const [id, sort] = strSort.split(':');

  return {
    id,
    desc: sort === 'desc',
  };
};

interface Props {
  columns: Column[];
  data: any;
}

/**
 * Sortable Table Component.
 * - Sort state is stored in url query params in order to easy access from parent.
 * - Keep table's state when navigating around.
 */
const Table = ({ columns, data }: Props) => {
  const router = useRouter();
  const sort = router.query.sort as string;

  const {
    headerGroups,
    rows,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      manualSortBy: true,
      initialState: {
        sortBy: sort ? [buildSortBy(sort as string)] : [],
      },
    },
    useSortBy,
  );

  // Handle push sort query params.
  useEffect(() => {
    if (sortBy.length === 0) {
      // If has sort query params, remove it.
      if (sort) {
        router.push(
          buildUrl({
            queryParams: {
              sort: null,
            },
          }),
        );
      }
      return;
    }
    const [firstItem] = sortBy;
    const order = firstItem.desc ? 'desc' : 'asc';
    router.push(
      buildUrl({
        queryParams: {
          sort: `${firstItem.id}:${order}`,
        },
      }),
    );
  }, [sortBy]);

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup, index) => (
            // Apply the header row props
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column, index2) => (
                  // Apply the header cell props
                  <th
                    key={index2}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {
                      // Render the header
                      column.render('Header')
                    }
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>

      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row, index) => {
            // Prepare the row for display
            prepareRow(row);

            return (
              // Apply the row props
              <tr key={index} {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell, index2) => {
                    // Apply the cell props
                    return (
                      <td key={index2} {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
