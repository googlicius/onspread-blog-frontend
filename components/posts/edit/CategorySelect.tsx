import { useCategoriesConnectionLazyQuery } from '@/graphql/generated';
import Option from '@/types/Option';
import React, { useEffect, useMemo, useState } from 'react';
import ReactSelect from 'react-select';
import debounce from 'lodash/debounce';

interface Props extends React.ComponentProps<typeof ReactSelect> {}

const CategorySelect = React.forwardRef<ReactSelect, Props>(
  ({ value, ...rest }, ref) => {
    const [options, setOptions] = useState<Option[]>([]);
    const [
      categoriesConnection,
      { data, loading, fetchMore },
    ] = useCategoriesConnectionLazyQuery({
      onCompleted: () => {
        setOptions([]);
      },
    });

    const selectedValue = useMemo(() => {
      if (typeof value === 'string') {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption;
      }
      return value;
    }, [options, value]);

    useEffect(() => {
      categoriesConnection();
    }, []);

    useEffect(() => {
      if (!data) {
        return;
      }

      const newOptions: Option[] = data.categoriesConnection.values.map(
        (category) => {
          return {
            label: category.name,
            value: category.id,
          };
        },
      );

      setOptions((prevOption) => [...prevOption, ...newOptions]);
    }, [data]);

    const handleInputChange = (search: string) => {
      categoriesConnection({
        variables: {
          search,
        },
      });
    };

    const handleFetchMore = async () => {
      const currentTotalFetched = options.length;
      const totalCount = data?.categoriesConnection.aggregate.totalCount;

      if (
        !loading &&
        totalCount &&
        currentTotalFetched < totalCount &&
        fetchMore
      ) {
        fetchMore({
          variables: {
            start: currentTotalFetched + 1,
          },
        });
      }
    };

    return (
      <ReactSelect
        {...rest}
        ref={ref}
        value={selectedValue}
        isLoading={loading}
        options={options}
        onInputChange={debounce(handleInputChange, 500)}
        onMenuScrollToBottom={handleFetchMore}
      />
    );
  },
);

CategorySelect.displayName = 'CategorySelect';

export default CategorySelect;
