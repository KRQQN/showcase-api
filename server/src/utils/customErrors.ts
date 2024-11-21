import { HTTPMessages, HTTPStatusCode } from "./enums";

export class HttpError extends Error {
  statusCode: number;
  redirect: string;

  constructor(message: string, statusCode: number, redirect?: string) {
    super(message);
    this.statusCode = statusCode;
    this.redirect = ''
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class NoContentException extends HttpError {
  constructor(message = HTTPMessages.NoContent) {
    super(message, HTTPStatusCode.NoContent);
  }
}

export class BadRequestException extends HttpError {
  constructor(message = HTTPMessages.BadRequest) {
    super(message, HTTPStatusCode.BadRequest);
  }
}

export class UnauthorizedException extends HttpError {
  constructor(message = HTTPMessages.Unauthorized) {
    super(message, HTTPStatusCode.Unauthorized);
  }
}

export class ForbiddenException extends HttpError {
  constructor(message = HTTPMessages.Forbidden) {
    super(message, HTTPStatusCode.Forbidden);
  }
}

export class NotFoundException extends HttpError {
  constructor(message = HTTPMessages.NotFound) {
    super(message, HTTPStatusCode.NotFound);
  }
}

export class ConflictException extends HttpError {
  constructor(message = HTTPMessages.Conflict) {
    super(message, HTTPStatusCode.Conflict);
  }
}

export class InternalServerErrorException extends HttpError {
  constructor(message = HTTPMessages.InternalServerError) {
    super(message, HTTPStatusCode.InternalServerError);
  }
}

export class UserInputException extends HttpError {
  constructor(message = 'Invalid input') {
    super(message, 400);
  }
}

