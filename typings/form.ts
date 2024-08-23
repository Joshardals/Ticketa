export interface AuthValidationType {
  email: string;
  password: string;
  confirmPassword?: string;

  fullname?: string;
  username?: string;
  gender?: string;
}
