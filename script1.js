const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "y4LJ3aK6dZDzq4KDRGwnHJkZoon7XP313Rx2HKD9u8jTNxKSKh");
myHeaders.append("x-apihub-host", "Open-Library-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "7843fb3f-2f97-4a10-8693-1b6f27b5f99a");

const requestOptions = {
   method: "GET",
   headers: myHeaders,
   redirect: "follow"
};

!(async function () {
  let data = fetch(
    "https://Open-Library-API.proxy-production.allthingsdev.co/search.json?title=To+Kill+a+Mockingbird",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      //console.log(result);
      DisplayBooks(result);
      return result;
    })
    .catch((error) => console.error(error));
})();

function DisplayBooks(_data) {
  //TODO
  //console.log(_data);
  let myData = JSON.parse(_data);
  console.log(myData.books[0]);
}
   
   