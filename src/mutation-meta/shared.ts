export type MaybeGetterOnSuccess<
  TValue,
  TData = unknown,
  TVariables = unknown,
> = TValue | ((data: TData, variables: TVariables) => TValue);

export type MaybeGetterOnError<
  TValue,
  TError = unknown,
  TVariables = unknown,
> = TValue | ((error: TError, variables: TVariables) => TValue);

export const toValueOnSuccess = <T, TData = unknown, TVariables = unknown>(
  maybeGetter: MaybeGetterOnSuccess<T, TData, TVariables>,
  data: TData,
  variables: TVariables,
): T => {
  if (typeof maybeGetter === 'function') {
    return (maybeGetter as (data: TData, variables: TVariables) => T)(
      data,
      variables,
    );
  }

  return maybeGetter;
};

export const toValueOnError = <T, TError = unknown, TVariables = unknown>(
  maybeGetter: MaybeGetterOnError<T, TError, TVariables>,
  error: TError,
  variables: TVariables,
): T => {
  if (typeof maybeGetter === 'function') {
    return (maybeGetter as (error: TError, variables: TVariables) => T)(
      error,
      variables,
    );
  }

  return maybeGetter;
};
