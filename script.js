// Random Quotes Api URL
const quoteApiUrl = "https://api.quotable.io/random?minLength=150&maxLength=200";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = null;
let mistakes = 0;

// Display random quotes
const renderNewQuote = async () => {
  // Fetch contents from URL
  const response = await fetch(quoteApiUrl);

  // Store response
  let data = await response.json();

  // Access quote
  quote = data.content;

  // Array of characters in the quote
  let arr = quote.split("").map((value) => {
    // Wrap the characters in a span tag
    return "<span class='quote-chars'>" + value + "</span>";
  });
  // Join array for displaying
  quoteSection.innerHTML = arr.join("");
};

// Logic for comparing input words with quote
userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");
  // Create an array from received span tags
  quoteChars = Array.from(quoteChars);

  // Array of user input characters
  let userInputChars = userInput.value.split("");

  // Loop through each character in the quote
  quoteChars.forEach((char, index) => {
    // Check if char(quote character) = userInputChars[index](input character)
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    }
    // If the user hasn't entered anything or backspaced
    else if (userInputChars[index] == null) {
      // Remove class if any
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    }
    // If the user enters the wrong character
    else {
      // Check if we already have added the fail class
      if (!char.classList.contains("fail")) {
        // Increment and display mistakes
        mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }
    // Returns true if all the characters are entered correctly
    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });
    // End test if all characters are correct
    if (check) {
      displayResult();
    }
  });
});

// Update Timer on screen
function updateTimer() {
  if (time == 0) {
    // End the test if the timer reaches 0
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s";
  }
}

// Sets timer
const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};

// End Test
const displayResult = () => {
  // Display result div
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  let timeTaken = 1;
  if (time !== 0) {
    timeTaken = (60 - time) / 60; // Corrected calculation
  }
  document.getElementById("wpm").innerText =
    (userInput.value.split(/\s+/).length / timeTaken).toFixed(2) + " wpm";
  document.getElementById("accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + " %";
};

// Start Test
const startTest = () => {
  // Reset variables and UI elements
  mistakes = 0;
  clearInterval(timer);
  timeReduce();

  // Enable user input
  userInput.disabled = false;

  // Focus on the input box
  userInput.focus();

  // Hide result div
  document.querySelector(".result").style.display = "none";

  // Show start button and hide stop button
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};


// Try Again
const tryAgain = async () => {
  // Reset variables and UI elements
  userInput.value = "";
  mistakes = 0;
  time = 60;
  clearInterval(timer);
  document.getElementById("timer").innerText = "60s";
  document.getElementById("mistakes").innerText = "0";

  // Log statements for debugging
  console.log("Mistakes:", mistakes);
  console.log("User Input Value:", userInput.value);

  // Generate and display a new random quote
  await renderNewQuote();

  // Reset quote display
  const quoteChars = document.querySelectorAll(".quote-chars");
  quoteChars.forEach((char) => {
    char.classList.remove("success", "fail");
  });

  // Enable user input
  userInput.disabled = false;

  // Hide result div
  document.querySelector(".result").style.display = "none";

  // Show start button and hide stop button
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
};

// Add event listeners to buttons
const startTestButton = document.getElementById("start-test");
const stopTestButton = document.getElementById("stop-test");
const tryAgainButton = document.getElementById("try-again-button");

startTestButton.addEventListener("click", startTest);
stopTestButton.addEventListener("click", displayResult);
tryAgainButton.addEventListener("click", tryAgain);

window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
