export interface i_register_user {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}
export interface i_login_user {
  email: string;
  password: string;
}

export interface i_change_auth_info {
  name?: string;
  old_password?: string;
  new_password?: string;
}
