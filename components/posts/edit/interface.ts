import {
  Enum_Post_Contenttype,
  Enum_Post_Displaytype,
} from '@/graphql/generated';

export interface FormData {
  title: string;
  content: string;
  image?: string;
  contentType: Enum_Post_Contenttype;
  description?: string;
  category: string;
  story?: string;
  storySeq?: number;
  displayType?: Enum_Post_Displaytype;
}
