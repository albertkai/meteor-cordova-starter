export const dataURItoBlob = (dataURI) => {
  var byteString, i, ia, mimeString;
  byteString = void 0;
  if (dataURI.split(",")[0].indexOf("base64") >= 0) {
    byteString = atob(dataURI.split(",")[1]);
  } else {
    byteString = unescape(dataURI.split(",")[1]);
  }
  mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  ia = new Uint8Array(byteString.length);
  i = 0;
  while (i < byteString.length) {
    ia[i] = byteString.charCodeAt(i);
    i++;
  }
  return new Blob([ia], {
    type: mimeString,
  });
};
