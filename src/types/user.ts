export type User = {
  id: string
  name: string
  email: string
}

export type SignInForm = Pick<User, 'email'> & {
  password: string
}
export type SignUpForm = Pick<User, 'name' | 'email'> & {
  password: string
  confirm_password: string
}
