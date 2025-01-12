export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Something is not work on server side", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Contact support to report the issue";
    this.statusCode = 500;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class InvalidMethodError extends Error {
  constructor({ method, validMethods }) {
    super(`method ${method} is not allowed`, { method, validMethods });
    this.name = "InvalidMethodError";
    this.action = `Only this methods are allowed: ${validMethods}`;
    this.statusCode = 405;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class InvalidParamsError extends Error {
  constructor({ nullParams, invalidFormat }) {
    super(
      `${nullParams ? `${nullParams} cannot be Null,` : ""}${invalidFormat ? `${invalidFormat} are missed formatted` : ""} could not submit datas`,
    );
    this.name = "InvalidParamsError";
    this.action = `${nullParams ? `Fill params: ${nullParams};` : ""}${invalidFormat ? `Format params: ${invalidFormat}` : ""}`;
    this.statusCode = 400;
    this.nullParams = nullParams;
    this.invalidFormat = invalidFormat;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      nullParams: this.nullParams,
      invalidFormat: this.invalidFormat,
      status_code: this.statusCode,
    };
  }
}

export class NotFoundError extends Error {
  constructor(route) {
    super(`Route api/v1/${route} not found`, { route });
    this.name = "NotFoundError";
    this.action = "Return to a valid route";
    this.statusCode = 404;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
