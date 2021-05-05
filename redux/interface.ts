import { UsersPermissionsMe } from '@/graphql/generated';

export interface MeState {
  value?: UsersPermissionsMe;
}

export interface RootState {
  me: MeState;
}
