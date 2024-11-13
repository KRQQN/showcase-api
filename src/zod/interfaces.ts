export interface ICustomError extends Error {
  statusCode: number;
  redirect: string;
}
