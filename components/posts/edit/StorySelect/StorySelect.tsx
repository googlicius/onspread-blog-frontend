import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import debounce from 'lodash/debounce';
import { useStoriesConnectionLazyQuery } from '@/graphql/generated';
import AddSvg from '@/components/svgs/AddSvg';
import Option from '@/types/Option';
import AddStoryModal, { AddStoryModalRef } from './AddStoryModal';
import { selectMe } from '@/redux/meProducer';

interface Props extends React.ComponentProps<typeof ReactSelect> {}

const StorySelect = React.forwardRef<ReactSelect, Props>(
  ({ value, ...rest }, ref) => {
    const addStoryModaRef = useRef<AddStoryModalRef>(null);
    const { t } = useTranslation();
    const [options, setOptions] = useState<Option[]>([]);
    const [
      storiesConnection,
      { data, loading, fetchMore, refetch },
    ] = useStoriesConnectionLazyQuery({
      onCompleted: () => {
        setOptions([]);
      },
    });
    const me = useSelector(selectMe);

    const selectedValue = useMemo(() => {
      if (typeof value === 'string') {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption;
      }
      return value;
    }, [options, value]);

    useEffect(() => {
      storiesConnection({
        variables: {
          user: me.value?.id,
        },
      });
    }, []);

    // Append new options on fetch-more's data.
    useEffect(() => {
      if (!data) {
        return;
      }

      const newOptions: Option[] = data.storiesConnection.values.map(
        (story) => ({
          label: story.name,
          value: story.id,
        }),
      );

      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
    }, [data]);

    const handleInputChange = (search: string): void => {
      storiesConnection({
        variables: {
          search,
          user: me.value?.id,
        },
      });
    };

    const handleFetchMore = (): void => {
      const currentTotalFetched = options.length;
      const totalCount = data?.storiesConnection.aggregate.totalCount;

      if (!loading && currentTotalFetched < totalCount && fetchMore) {
        fetchMore({
          variables: {
            start: currentTotalFetched + 1,
          },
        });
      }
    };

    const handleOpenAddStoryModal = () => {
      addStoryModaRef.current.toggleOpen();
    };

    const handleNewStoryAdded = () => {
      refetch();
      addStoryModaRef.current.toggleOpen();
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
            onClick={handleOpenAddStoryModal}
          >
            <AddSvg title={t('Add a story')} />
          </button>
        </div>

        <AddStoryModal
          ref={addStoryModaRef}
          newStoryAdded={handleNewStoryAdded}
        />
      </>
    );
  },
);

StorySelect.displayName = 'StorySelect';

export default StorySelect;
