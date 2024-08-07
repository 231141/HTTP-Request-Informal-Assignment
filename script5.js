const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "y4LJ3aK6dZDzq4KDRGwnHJkZoon7XP313Rx2HKD9u8jTNxKSKh");
myHeaders.append("x-apihub-host", "Detect-Skin-Disease.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "6578fca5-b948-4270-8718-bdc7941582b7");

const formdata = new FormData();
formdata.append("image", fileInput.files[0], "file");

const requestOptions = {
   method: "POST",
   headers: myHeaders,
   body: formdata,
   redirect: "follow"
};



!(async function () {
  let data = fetch(
    "https://Detect-Skin-Disease.proxy-production.allthingsdev.co/facebody/analysis/detect-skin-disease",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      //console.log(result);
      DisplayAnime(result);
      return result;
    })
    .catch((error) => console.error(error));
})();

function DisplayAnime(_data) {
  //TODO
  //console.log(_data);
  let myData = JSON.parse(_data);
  console.log(myData.anime[0]);
}