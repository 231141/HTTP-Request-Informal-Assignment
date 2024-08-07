const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "y4LJ3aK6dZDzq4KDRGwnHJkZoon7XP313Rx2HKD9u8jTNxKSKh");
myHeaders.append("x-apihub-host", "Movies-Verse.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "4f700f4a-4bd2-4604-8d5b-7b5e4c976c65");

const requestOptions = {
   method: "GET",
   headers: myHeaders,
   redirect: "follow"
};

!async function ()
{
let data = fetch("https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/upcoming-movies", requestOptions)
   .then((response) => response.text())
   .then((result) =>
    {
        //console.log(result);
        DisplayMovies(result);
        return result;
    })
   .catch((error) => console.error(error));
}();

function DisplayMovies (_data)
{
    //TODO
    //console.log(_data);
    let myData = JSON.parse(_data);
    console.log(myData.movies[0]);

}

