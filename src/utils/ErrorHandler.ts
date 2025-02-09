type Ok<T> = {
  success: true;
  data: T;
};

type Err = {
  success: false;
  error: keyof typeof ERRORS_MESSAGE;
  stacks?: unknown[];
};

const ERRORS_MESSAGE = {
  UNKNOWN_ERROR: 'Desculpe, ocorreu um erro. Por favor, entrar em contato!',
  invalid_credentials: 'Credenciais inválidas',
  email_exists: 'email_exists',
  over_email_send_rate_limit: 'over_email_send_rate_limit',
};

export type Resolve<T> = Ok<T> | Err;
export type ResolveAsync<T> = Promise<Resolve<T>>;

export const Ok = <T>(data: T): Ok<T> => ({
  success: true,
  data,
});

export const Err = (
  error: keyof typeof ERRORS_MESSAGE,
  stacks = [] as unknown[]
): Err => ({
  success: false,
  error,
  stacks,
});

export const ErrorMessage = (error: keyof typeof ERRORS_MESSAGE): string =>
  ERRORS_MESSAGE[error] || ERRORS_MESSAGE['UNKNOWN_ERROR'];
