const firebase = require("firebase-admin");
const { firestore } = require("firebase-admin/lib");
const { USER_COLLECTION } = require("../constants/UserConstants");

class UserDataSource {
  async getUserDetails(userId: String) {
    let userData = await firestore()
      .collection(USER_COLLECTION)
      .doc(userId)
      .get();
    let user = userData.data();
    return { ...user };
  }
  async getPaymentInfoByUserId(userId: String) {
    let user = await this.getUserDetails(userId);
    return {
      payment: user.fees as String,
    };
  }
}

export const userDataSource = new UserDataSource();
