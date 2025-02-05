import { Response } from 'express';
import { StatusCode, ResponseStatus } from '../enums';

export abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string,
    protected data: any = {}
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: { [key: string]: string },
  ): Response {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(
    res: Response,
    headers: { [key: string]: string } = {},
  ): Response {
    return this.prepare<ApiResponse>(res, this, headers);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Access token invalid') {
    super(
      StatusCode.INVALID_ACCESS_TOKEN,
      ResponseStatus.BAD_REQUEST,
      message,
    );
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    headers.instruction = this.instruction;
    return super.prepare<AccessTokenErrorResponse>(res, this, headers);
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(StatusCode.FAILURE, ResponseStatus.UN_AUTHORISED, message);
  }
}
export class PermissionErrorResponse extends ApiResponse {
  constructor(message = 'You are not allowed to perform this action') {
    super(StatusCode.FAILURE, ResponseStatus.UN_AUTHORISED, message);
  }
}
export class UnknownPolicyMethod extends ApiResponse {
  constructor(message = 'The policy method you are trying to call does not exist') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class UnauthorizedErrorResponse extends ApiResponse {
  constructor(message = 'Unathorized') {
    super(StatusCode.FAILURE, ResponseStatus.UN_AUTHORISED, message);
  }
}

export class BadRequestErrorResponse<T> extends ApiResponse {
  constructor(message = 'Bad Parameters', data?: T) {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message, data);
  }
}
export class BadRequestResponse<T> extends ApiResponse {
  constructor(message = 'Bad Parameters', data: T) {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message, data);
  }
}

export class BadTokenErrorResponse extends ApiResponse {
  constructor(message = 'Bad Token Provided') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

export class ConflictErrorResponse extends ApiResponse {
  constructor(message = 'Conflict') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

export class UnprocessableEntityErrorResponse<T> extends ApiResponse {
  constructor(message = 'Unprocessable Entity', data?: T) {
    super(StatusCode.FAILURE, ResponseStatus.UNPROCESSABLE_ENTITY, message, data);
  }
}

export class CreateSuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.CREATED, ResponseStatus.CREATED, message);
  }
}

export class CreateSuccessResponse<T> extends ApiResponse {
  constructor(message: string, data: T) {
    super(StatusCode.CREATED, ResponseStatus.CREATED, message, data);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<CreateSuccessResponse<T>>(res, this, headers);
  }
};

export class DeleteSuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.NO_CONTENT, ResponseStatus.NO_CONTENT, message);
  }
};

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.OK, message);
  }
}

export class ForbiddenErrorResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

export class InternalServerErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class NoEntryErrorResponse extends ApiResponse {
  constructor(message = 'Entry does not exists') {
    super(StatusCode.FAILURE, ResponseStatus.NO_ENTRY, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<NotFoundErrorResponse>(res, this, headers);
  }
}

export class NotFoundErrorResponse extends ApiResponse {
  constructor(message = 'Not Found') {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<NotFoundErrorResponse>(res, this, headers);
  }
}


export class TokenExpiredErrorResponse extends ApiResponse {
  constructor(message = 'Token expired!') {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.OK, ResponseStatus.OK, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, data: T | null = null) {
    super(StatusCode.OK, ResponseStatus.OK, message, data);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<SuccessResponse<T>>(res, this, headers);
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(
    message: string,
    private accessToken: string,
    private refreshToken: string,
  ) {
    super(StatusCode.OK, ResponseStatus.OK, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<TokenRefreshResponse>(res, this, headers);
  }
}

export class FilesizeErrorResponse extends ApiResponse {
  constructor(message = 'File size exceeds limit!') {
    super(StatusCode.FAILURE, ResponseStatus.ENTITY_TOO_LARGE, message);
  }
}

export class RefreshTokenErrorResponse extends ApiResponse {
  constructor(message = 'Invalid refresh token') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}