import { UsersPermissionsMe } from '@/graphql/generated';

export interface MeState {
  value?: UsersPermissionsMe;
  status: 'init' | 'idle' | 'loading';
}

export interface RootState {
  me: MeState;
}
