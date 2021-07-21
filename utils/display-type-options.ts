import { TFunction } from 'i18next';
import Option from '@/types/Option';
import { Enum_Post_Displaytype } from '@/graphql/generated';

const displayTypeOptions = (t: TFunction): Option[] => [
  {
    label: t('Select a type...'),
    value: null,
  },
  {
    label: t('With Image'),
    value: Enum_Post_Displaytype.WithImage,
  },
  {
    label: t('Fullscreen Image'),
    value: Enum_Post_Displaytype.FullscreenImage,
  },
  {
    label: t('No Image'),
    value: Enum_Post_Displaytype.NoImage,
  },
];

export default displayTypeOptions;
