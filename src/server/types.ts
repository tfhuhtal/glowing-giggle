import { User } from '../types';

interface UserInfo {
  id: string;
  displayName: string;
  username: string;
  emails: { value: string }[];
}

export { User, UserInfo };
