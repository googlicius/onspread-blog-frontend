import { UsersPermissionsMe } from '@/graphql/generated';

export interface MeState {
  value?: UsersPermissionsMe;
  status: 'idle' | 'loading';
}

export interface RootState {
  me: MeState;
}
