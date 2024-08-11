document
  .getElementById("applyButton")
  .addEventListener("click", applyInputs);
document
  .getElementById("getDataButton")
  .addEventListener("click", () => {
    if (applyInputs()) {
      drawAmazonData()
        .then((data) => {
          displayData(data);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  });

function applyInputs() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const communicationContainer = document.getElementById(
    "communication-container"
  );
  communicationContainer.innerHTML = ""; 

  let isValid = true;
  let EnterMessage = "";

  if (!email.endsWith("@gmail.com")) {
    isValid = false;
    EnterMessage += "Email must end with @gmail.com.<br>";
  }


  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  if (!hasUppercase || !hasNumber) {
    isValid = false;
    EnterMessage +=
      "Password must have at least one uppercase letter and one number.<br>";
  }

  if (isValid) {
    EnterMessage = "You have been logged in!";
    communicationContainer.className = "success-message";
  } else {
    communicationContainer.className = "bad-message";
  }

  communicationContainer.innerHTML = EnterMessage;
  return isValid;
}

function drawAmazonData() {
  const myHeaders = new Headers();
  myHeaders.append(
    "x-apihub-key",
    "y4LJ3aK6dZDzq4KDRGwnHJkZoon7XP313Rx2HKD9u8jTNxKSKh"
  );
  myHeaders.append("x-apihub-host", "Real-Time-Amazon-Data.allthingsdev.co");
  myHeaders.append("x-apihub-endpoint", "41654d76-eaf5-4690-9d46-d88b1665322e");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    "https://Real-Time-Amazon-Data.proxy-production.allthingsdev.co/v2/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&category_id=null&min_price=105&max_price=110&brand=null",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

function displayData(data) {
  const infoContainer = document.getElementById("info-container");
  const communicationContainer = document.getElementById(
    "communication-container"
  );
  infoContainer.innerHTML = ""; 
  communicationContainer.innerHTML = ""; 

  if (!data.success) {
    const wrongMessage = document.createElement("p");
    wrongMessage.textContent = data.message;
    wrongMessage.className = "bad-message";
    communicationContainer.appendChild(wrongMessage);
    return;
  }

  for (let i = 0; i < 2; i++) {
    if (data[i]) {
      const answerElement = document.createElement("div");
      answerElement.className = "displayed-item";

      const title = document.createElement("h2");
      title.textContent = data[i].title || "N/A";
      answerElement.appendChild(title);

      const details = document.createElement("p");
      details.textContent = `Price: ${data[i].price || "N/A"}`;
      answerElement.appendChild(details);

      infoContainer.appendChild(answerElement); 
    }
  }
  
}
