document
  .getElementById("applicationButton")
  .addEventListener("click", applyInputs);
document
  .getElementById("drawInformationButton")
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
  communicationContainer.innerHTML = ""; // Clear previous messages

  let isValid = true;
  let message = "";

  // Email corrector
  if (!email.endsWith("@gmail.com")) {
    isValid = false;
    message += "Email must end with @gmail.com.<br>";
  }

  // Password corrector
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  if (!hasUppercase || !hasNumber) {
    isValid = false;
    message +=
      "Password must contain at least one uppercase letter and one number.<br>";
  }

  if (isValid) {
    message = "Validation successful!";
    communicationContainer.className = "success-message";
  } else {
    communicationContainer.className = "error-message";
  }

  communicationContainer.innerHTML = message;
  return isValid;
}

function drawAmazonData() {
  // Create headers
  const myHeaders = new Headers();
  myHeaders.append(
    "x-apihub-key",
    "y4LJ3aK6dZDzq4KDRGwnHJkZoon7XP313Rx2HKD9u8jTNxKSKh"
  );
  myHeaders.append("x-apihub-host", "Real-Time-Amazon-Data.allthingsdev.co");
  myHeaders.append("x-apihub-endpoint", "41654d76-eaf5-4690-9d46-d88b1665322e");

  // Create request options
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // Perform fetch request
  return fetch(
    "https://Real-Time-Amazon-Data.proxy-production.allthingsdev.co/v2/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&category_id=null&min_price=105&max_price=110&brand=null",
    requestOptions
  )
    .then((response) => response.json()) // Parse JSON directly
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
  const infoContainer = document.getElementById("info-container"); // Checked to see if it matches the HTML ID
  const communicationContainer = document.getElementById(
    "communication-container"
  );
  infoContainer.innerHTML = ""; // Clear previous content
  communicationContainer.innerHTML = ""; // Clear previous messages

  if (!data.success) {
    // Shows error message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = data.message;
    errorMessage.className = "error-message";
    communicationContainer.appendChild(errorMessage);
    return;
  }

  // shows the first two items (adjust according to actual structure)
  for (let i = 0; i < 2; i++) {
    if (data[i]) {
      const resultElement = document.createElement("div");
      resultElement.className = "result-item";

      const title = document.createElement("h2");
      title.textContent = data[i].title || "N/A";
      resultElement.appendChild(title);

      const details = document.createElement("p");
      details.textContent = `Price: ${data[i].price || "N/A"}`; // Goes according to actual structure
      resultElement.appendChild(details);

      infoContainer.appendChild(resultElement); // Checked if it matches HTML ID
    }
  }
}
