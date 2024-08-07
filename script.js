const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "y4LJ3aK6dZDzq4KDRGwnHJkZoon7XP313Rx2HKD9u8jTNxKSKh");
myHeaders.append("x-apihub-host", "AnimeList-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "10b0d633-40f8-43ee-af7f-812833c933a1");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

const fetchAnime = async () => {
  try {
    const response = await fetch(
      "https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime?q=Naruto",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Result:", result);

    // Save the relevant information into a variable
    const relevantInfo = result.data.map(anime => ({
      title: anime.title,
      synopsis: anime.synopsis
    }));

    console.log("Relevant Information:", relevantInfo);

    // Display two items from the API on your website
    displayAnime(relevantInfo);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayAnime = (animeList) => {
  const container = document.getElementById("anime-container");
  animeList.slice(0, 2).forEach(anime => {
    const animeElement = document.createElement("div");
    animeElement.innerHTML = `<h2>${anime.title}</h2><p>${anime.synopsis}</p>`;
    container.appendChild(animeElement);
  });
};

// Call the function to fetch and display the anime
fetchAnime();
