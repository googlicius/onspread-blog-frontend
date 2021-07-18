import {
  Enum_Post_Contenttype,
  Enum_Post_Displaytype,
} from '@/graphql/generated';
import Option from '@/types/Option';

export interface FormData {
  title: string;
  content: string;
  image?: string;
  contentType: Enum_Post_Contenttype;
  description?: string;
  category: string;
  story?: string;
  tags: Option[];
  storySeq?: number;
  displayType?: Enum_Post_Displaytype;
  published_at?: string;
}
