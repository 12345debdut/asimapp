import { userDataSource } from "../datasource/UserDataSource";
class UserRepository {
  async getUserDetails(userId: string) {}
  async getPaymentInfoByUserId(userId: string) {
    return userDataSource.getPaymentInfoByUserId(userId);
  }
}

module.exports = new UserRepository();
