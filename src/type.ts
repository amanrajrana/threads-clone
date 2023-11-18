type AuthStateType = {
  email?: string;
  name?: string;
  username?: string | undefined;
  password?: string;
  password_confirmation?: string;
};

type AuthErrorType = {
  email?: string;
  name?: string;
  username?: string | undefined;
  password?: string;
  password_confirmation?: string;
};
