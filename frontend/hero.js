const cloudName = "codewithmama"; // replace with your own cloud name
const uploadPreset = "wrapfileImg"; // replace with your own upload preset



const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    multiple: true,  //restrict upload to a single file
   
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info.secure_url);
      document
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url);
    }
  }
);

document.getElementById("selectImage").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
