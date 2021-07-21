import { UsersPermissionsMe } from '@/graphql/generated';

export interface MeState {
  value?: UsersPermissionsMe;
  status: 'init' | 'idle' | 'loading';
}

export interface SocketState {
  isLoaded: boolean;
  value: any;
}

export interface RootState {
  me: MeState;
  socket: SocketState;
}

export interface SetLoggedInUserAction {
  payload: UsersPermissionsMe;
  type: string;
}

export interface SetSocketAction {
  payload?: any;
  type: string;
}
