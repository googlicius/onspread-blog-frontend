import { Enum_Post_Contenttype } from '@/graphql/generated';

export interface Step1FormData {
  title: string;
  content: string;
  contentType: Enum_Post_Contenttype;
}

export interface Step2FormData {
  description?: string;
}

export interface FormData extends Step1FormData, Step2FormData {}
