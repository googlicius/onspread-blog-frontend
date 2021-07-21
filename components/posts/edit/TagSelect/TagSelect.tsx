import { forwardRef, useEffect } from 'react';
import { useTagsConnectionLazyQuery } from '@/graphql/generated';
import ReactSelect from 'react-select';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import useDynamicOption from '@/hooks/dynamic-option';

interface Props extends React.ComponentProps<typeof ReactSelect> {}

const TagSelect = forwardRef<any, Props>((props, ref) => {
  const { t } = useTranslation();
  const [
    tagsConnection,
    { data, loading, fetchMore },
  ] = useTagsConnectionLazyQuery({
    onCompleted: () => {
      setOptions([
        {
          label: t('Select...'),
          value: null,
        },
      ]);
    },
  });

  useEffect(() => {
    tagsConnection();
  }, []);

  const { options, setOptions, handleFetchMore } = useDynamicOption({
    values: get(data, 'tagsConnection.values', []),
    totalCount: get(data, 'tagsConnection.aggregate.totalCount', 0),
    labelField: 'name',
    valueField: 'id',
    loading,
    fetchMore,
  });

  const handleInputChange = (search: string): void => {
    tagsConnection({
      variables: {
        search,
      },
    });
  };

  return (
    <ReactSelect
      {...props}
      ref={ref}
      isLoading={loading}
      options={options}
      onInputChange={debounce(handleInputChange, 500)}
      onMenuScrollToBottom={handleFetchMore}
    />
  );
});

TagSelect.displayName = 'TagSelect';

export default TagSelect;
