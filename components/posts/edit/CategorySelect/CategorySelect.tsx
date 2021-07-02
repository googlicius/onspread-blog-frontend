import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';
import { useCategoriesConnectionLazyQuery } from '@/graphql/generated';
import Option from '@/types/Option';
import AddSvg from '@/components/svgs/AddSvg';
import AddCategoryModal, { AddCategoryModalRef } from './AddCategoryModal';

interface Props extends React.ComponentProps<typeof ReactSelect> {}

const CategorySelect = forwardRef<ReactSelect, Props>(
  ({ value, ...rest }, ref) => {
    const [options, setOptions] = useState<Option[]>([]);
    const { t } = useTranslation();
    const addCategoryModaRef = useRef<AddCategoryModalRef>(null);
    const [
      categoriesConnection,
      { data, loading, fetchMore, refetch },
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

    // Append new options on fetch-more's data.
    useEffect(() => {
      if (!data) {
        return;
      }

      const newOptions: Option[] = data.categoriesConnection.values.map(
        (category) => ({
          label: category.name,
          value: category.id,
        }),
      );

      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
    }, [data]);

    const handleInputChange = (search: string): void => {
      categoriesConnection({
        variables: {
          search,
        },
      });
    };

    const handleNewCategoryAdded = () => {
      refetch();
      addCategoryModaRef.current.toggleOpen();
    };

    const handleOpenAddCategoryModal = () => {
      addCategoryModaRef.current.toggleOpen();
    };

    const handleFetchMore = (): void => {
      const currentTotalFetched = options.length;
      const totalCount = data?.categoriesConnection.aggregate.totalCount;

      if (!loading && currentTotalFetched < totalCount && fetchMore) {
        fetchMore({
          variables: {
            start: currentTotalFetched + 1,
          },
        });
      }
    };

    return (
      <>
        <div className="d-flex">
          <ReactSelect
            {...rest}
            className="flex-grow-1"
            ref={ref}
            value={selectedValue}
            isLoading={loading}
            options={options}
            onInputChange={debounce(handleInputChange, 500)}
            onMenuScrollToBottom={handleFetchMore}
          />

          <button
            type="button"
            className="btn shadow-none"
            onClick={handleOpenAddCategoryModal}
          >
            <AddSvg title={t('Add a story')} />
          </button>
        </div>

        <AddCategoryModal
          ref={addCategoryModaRef}
          newCategoryAdded={handleNewCategoryAdded}
        />
      </>
    );
  },
);

CategorySelect.displayName = 'CategorySelect';

export default CategorySelect;
