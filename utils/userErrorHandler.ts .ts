export function createError(message: string, status = 500) {
  const error = new Error(message);
  (error as any).status = status;
  return error;
}