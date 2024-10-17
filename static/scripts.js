document.getElementById("conversionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let tempValue = document.getElementById("temp_value").value;
  let tempName = document.getElementById("temp_name").value.toUpperCase();

  fetch("http://127.0.0.1:5000/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temp_value: parseInt(tempValue),
      temp_name: tempName,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      //   document.getElementById("result").textContent = data.result;
      const resultContainer = document.getElementById("result");
      resultContainer.innerHTML = data.result;

      let bodyElement = document.body;

      let temperature = parseInt(tempValue);

      let endGradient;

      if (tempName === "F") {
        temperature = (temperature - 32) * (5 / 9);
        if (temperature < 10) {
          endGradient = "linear-gradient(to right, #74ebd5, #acb6e5)";
        } else if (temperature < 29) {
          endGradient = "linear-gradient(to right, #f5af19, #f12711)";
        } else {
          endGradient = "linear-gradient(to right, #ff6b6b, #d64545)";
        }
        generateKeyframes(endGradient);
        bodyElement.style.animation = "backgroundFade 0.5s ease-in-out forwards";
      } else if (tempName === "C") {
        temperature = (temperature * 9) / 5 + 32;
        if (temperature < 50) {
          endGradient = "linear-gradient(to right, #74ebd5, #acb6e5)";
        } else if (temperature < 85) {
          endGradient = "linear-gradient(to right, #f5af19, #f12711)";
        } else {
          endGradient = "linear-gradient(to right, #ff6b6b, #d64545)";
        }
        generateKeyframes(endGradient);
        bodyElement.style.animation = "backgroundFade 0.5s ease-in-out forwards";
      }
    })
    .catch((error) => console.error("Error:", error));

  function generateKeyframes(endGradient) {
    const style = document.createElement("style");

    style.type = "text/css";

    const keyframes = `
      @keyframes backgroundFade {
        0% {
        background: linear-gradient(to right, #3c3f47, #3c3f47); /* Initial Color */
        }
        20% {
          background: linear-gradient(to right, #5a5d64, #5a5d64); /* Slightly lighter */
        }
        40% {
          background: linear-gradient(to right, #7a7d84, #7a7d84); /* Medium shade */
        }
        60% {
          background: linear-gradient(to right, #9a9d94, #9a9d94); /* Lighter shade */
        }
        80% {
          background: ${endGradient}; /* Approaching final color */
        }
        100% {
          background: ${endGradient}; /* Final Color */
        }
      }
    `;

    style.appendChild(document.createTextNode(keyframes));

    document.head.appendChild(style);
  }
});
