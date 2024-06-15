import { firebaseapp } from "../../init";

export const galleryDelete = async (id, imagepath, catagory) => {
  try {
    let resdel = await firebaseapp.storage().ref(imagepath).delete();
  } catch (err) {
    console.log("Error: " + err.message + err.status);
    return await deleteFromDb();
  }
  return await deleteFromDb(catagory, id);
};

async function deleteFromDb(catagory, id) {
  try {
    console.log("Trying to clear DB!!!");
    let resdeldb = await firebaseapp
      .firestore()
      .collection(catagory + "Gallery")
      .doc(id)
      .delete();
    return {
      status: 200,
      message: "Successfully deleted",
    };
  } catch (err) {
    console.log("ERR: " + err.message);
    return {
      status: 400,
      message: err.message,
    };
  }
}
