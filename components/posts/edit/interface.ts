import {
  Enum_Post_Contenttype,
  Enum_Post_Displaytype,
} from '@/graphql/generated';

export interface Step1FormData {
  title: string;
  content: string;
  contentType: Enum_Post_Contenttype;
}

export interface Step2FormData {
  description?: string;
  category: string;
  displayType?: Enum_Post_Displaytype;
}

export interface FormData extends Step1FormData, Step2FormData {}
