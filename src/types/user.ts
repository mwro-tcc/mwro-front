export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type SignInForm = Pick<User, "email" | "password">;
export type SignUpForm = Pick<User, "name" | "email" | "password"> & {
  confirm_password: string;
};
