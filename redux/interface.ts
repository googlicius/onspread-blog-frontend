import { UsersPermissionsMe } from '@/graphql/generated';

export interface IMeState {
  value?: UsersPermissionsMe;
}

export interface IRootState {
  me: IMeState;
}
