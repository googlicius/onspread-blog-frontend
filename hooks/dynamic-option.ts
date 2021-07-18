import { useEffect, useMemo, useState } from 'react';
import { OptionTypeBase } from 'react-select';
import Option from '@/types/Option';

interface Props {
  value?: OptionTypeBase | readonly OptionTypeBase[];
  values?: any[];
  totalCount: number;
  labelField: string;
  valueField: string;
  loading: boolean;
  fetchMore: any;
}

const DynamicOption = ({
  value,
  values = [],
  totalCount,
  labelField,
  valueField,
  loading,
  fetchMore,
}: Props) => {
  const [options, setOptions] = useState<Option[]>([]);

  const selectedValue = useMemo(() => {
    if (typeof value === 'string') {
      const selectedOption = options.find((option) => option.value === value);
      return selectedOption;
    }
    return value;
  }, [options, value]);

  // Append new options on fetch-more's data.
  useEffect(() => {
    if (values.length === 0) {
      return;
    }

    const newOptions: Option[] = values.map((story) => ({
      label: story[labelField],
      value: story[valueField],
    }));

    setOptions((prevOptions) => [...prevOptions, ...newOptions]);
  }, [values]);

  const handleFetchMore = (): void => {
    const currentTotalFetched = options.length;

    if (!loading && currentTotalFetched < totalCount && fetchMore) {
      fetchMore({
        variables: {
          start: currentTotalFetched + 1,
        },
      });
    }
  };

  return {
    options,
    selectedValue,
    setOptions,
    handleFetchMore,
  };
};

export default DynamicOption;
