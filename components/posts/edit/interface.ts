import { Enum_Post_Contenttype } from '@/graphql/generated';
import Option from '@/types/Option';

export interface FormData {
  title: string;
  content: string;
  image?: string;
  contentType: Enum_Post_Contenttype;
  description?: string;
  category: string;
  story?: Option;
  tags: Option[];
  storySeq?: number;
  displayType?: Option;
  published_at?: string;
}
