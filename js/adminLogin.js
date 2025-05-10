const userNameInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const message = document.getElementById("login-msg");
const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

const admins = [
  {
    username: "amribrahem",
    password: "admin1",
    name: "Amr Ibrahem",
  },
  {
    username: "hishamhalhool",
    password: "admin2",
    name: "Hisham Halhool",
  },
  {
    username: "nadeenelgendy",
    password: "admin3",
    name: "Nadeen ElGendy",
  },
  {
    username: "shimaamossad",
    password: "admin4",
    name: "Shimaa Mossad",
  },
];

localStorage.setItem("adminAccounts", JSON.stringify(admins));

loginBtn.addEventListener("click", () => {
  const adminAccounts = JSON.parse(localStorage.getItem("adminAccounts"));
  let userName = userNameInput.value.trim();
  let password = passwordInput.value.trim();

  const found = adminAccounts.find(
    (admin) => admin.username === userName && admin.password === password
  );

  if (found) {
    message.innerText = "";
    window.location.href = "../dashboard.html";
    if (found) {
      localStorage.setItem("loggedInAdmin", found.name);
      window.location.href = "../dashboard.html";
    }
  } else {
    message.innerText = "Invalid credentials";
  }
});
