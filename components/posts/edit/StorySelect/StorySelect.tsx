import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { useStoriesConnectionLazyQuery } from '@/graphql/generated';
import AddSvg from '@/components/svgs/AddSvg';
import AddStoryModal, { AddStoryModalRef } from './AddStoryModal';
import { selectMe } from '@/redux/meProducer';
import useDynamicOption from '@/hooks/dynamic-option';
import Option from '@/types/Option';

interface Props extends React.ComponentProps<typeof ReactSelect> {}

const StorySelect = React.forwardRef<ReactSelect, Props>(
  ({ value, ...rest }, ref) => {
    const addStoryModaRef = useRef<AddStoryModalRef>(null);
    const { t } = useTranslation();
    const [
      storiesConnection,
      { data, loading, fetchMore, refetch },
    ] = useStoriesConnectionLazyQuery({
      onCompleted: () => {
        setOptions([
          {
            label: t('Select...'),
            value: null,
          },
        ]);
      },
    });

    const {
      selectedValue,
      options,
      setOptions,
      handleFetchMore,
    } = useDynamicOption({
      value,
      values: get(data, 'storiesConnection.values', []),
      totalCount: get(data, 'storiesConnection.aggregate.totalCount', 0),
      labelField: 'name',
      valueField: 'id',
      loading,
      fetchMore,
    });

    const me = useSelector(selectMe);

    useEffect(() => {
      storiesConnection({
        variables: {
          user: me.value?.id,
        },
      });
    }, []);

    const handleInputChange = (search: string): void => {
      storiesConnection({
        variables: {
          search,
          user: me.value?.id,
        },
      });
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
            onChange={(option: Option) => {
              return option.value;
            }}
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
