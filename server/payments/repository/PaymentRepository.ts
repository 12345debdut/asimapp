import { httpCode } from "../../types/HttpCode";
import { Response } from "../../types/RepositoryResponse";
import { CreatePaymentResponse } from "../models/CreatePaymentResponse";
import { PaymentMode } from "../models/PaymentMode";

class PaymentRepository {
  async createPayment(
    userId: string,
    paymentAmount: string,
    month: string,
    mode: string
  ): Promise<Response<CreatePaymentResponse>> {
    switch (mode) {
      case PaymentMode.OFFLINE.toString():
        break;
      case PaymentMode.ONLINE.toString():
        break;
      default:
        break;
    }
    return {
      status: httpCode.badRequest,
      data: { id: undefined },
    };
  }

  async updatePayment(
    userId: string,
    paymentAmount: string,
    month: string,
    mode: string
  ) {}
}

module.exports = new PaymentRepository();
