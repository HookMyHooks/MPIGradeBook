export interface User {
  id: number;
  email: string;
  username: string;
  student?: any;
  teacher?: any;
  authToken: string;
  role: 'STUDENT' | 'TEACHER';
}
