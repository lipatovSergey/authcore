type PostgresErrorLike = { code: string; detail: string };

export function isPostgresErrorLike(
  value: unknown,
): value is PostgresErrorLike {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    'detail' in value &&
    typeof value.code === 'string' &&
    typeof value.detail === 'string'
  );
}
