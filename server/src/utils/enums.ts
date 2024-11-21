// prettier-ignore
export enum HTTPStatusCode {
  Ok                  = 200,
  Created             = 201,
  Accepted            = 202,
  NoContent           = 204,
  BadRequest          = 400,
  Unauthorized        = 401,
  Forbidden           = 403,
  NotFound            = 404,
  Conflict            = 409,
  InternalServerError = 500,
}
// prettier-ignore
export const HTTPMessages = {
  Ok                 : 'OK',
  Created            : 'Created',
  Accepted           : 'Accepted',
  NoContent          : 'No Content',
  BadRequest         : 'Bad Request',
  Unauthorized       : 'Unauthorized',
  Forbidden          : 'Forbidden',
  NotFound           : 'Not Found',
  Conflict           : 'Conflict',
  InternalServerError: 'Internal Server Error',
};
