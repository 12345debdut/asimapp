import { firebaseapp } from "../../init";

export const galleryUploadSingle = async (
  gtitle,
  gdesc,
  gimages,
  gpurpose,
  gdate
) => {
  if (gimages.length === 0) {
    return {
      status: 400,
      message: "Image is required",
    };
  }
  console.log(gimages);
  let imagePromises = Array();
  for (let singleImage of gimages) {
    imagePromises.push(fileUpload(singleImage, `${gpurpose}Gallery/${gtitle}`));
  }
  const res = await Promise.all(imagePromises);
  const successfullFileResponse = res.filter((item) => item.status === 200);
  const firebaseDb = firebaseapp.firestore();
  const batchDb = firebaseDb.batch();
  successfullFileResponse.forEach((fileUpRes) => {
    batchDb.set(firebaseDb.collection(gpurpose + "Gallery").doc(), {
      galleryTitle: gtitle,
      galleryImageUrl: fileUpRes.url,
      galleryImagePath: fileUpRes.urlpath,
      galleryDescription: gdesc,
      galleryDate: gdate,
      uploadDate: Date.now(),
    });
  });
  try {
    await batchDb.commit();
    return {
      status: 200,
      message: "Successfully added to database",
    };
  } catch (err) {
    return {
      status: 400,
      message: err.message,
    };
  }
};
const fileUpload = async (noticeDocs, str) => {
  let response = await firebaseapp
    .storage()
    .ref(`/${str}/${noticeDocs.name}`)
    .put(noticeDocs)
    .then(async (res) => {
      let url = await res.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .catch((err) => {
          return null;
        });
      if (url == null) {
        return {
          status: 400,
          message: "Something went wrong in uploading the file",
        };
      } else {
        return {
          status: 200,
          url: url,
          urlpath: `/${str}/${noticeDocs.name}`,
        };
      }
    })
    .catch((err) => {
      return {
        status: 400,
        message: err.message,
      };
    });
  return response;
};
