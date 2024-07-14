export interface HttpCode {
  code: number;
}

class CreatedHttpCode implements HttpCode {
  code: number = 201;
}

class SuccessHttpCode implements HttpCode {
  code: number = 200;
}

class BadRequestHttpCode implements HttpCode {
  code: number = 400;
}

class InternalServerErrorHttpCode implements HttpCode {
  code: number = 500;
}

export const httpCode = {
  created: new CreatedHttpCode(),
  success: new SuccessHttpCode(),
  badRequest: new BadRequestHttpCode(),
  internalServerError: new InternalServerErrorHttpCode(),
};
