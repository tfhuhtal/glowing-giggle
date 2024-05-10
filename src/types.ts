export interface User {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string; };
  emails: { value: string; }[];
}
