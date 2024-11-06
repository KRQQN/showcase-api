class ClientError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

class ServerError extends Error {
  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.name = 'ServerError';
  }
}
