"use strict";
let UserNameRef = document.getElementById("username");
let PasswordRef = document.getElementById("password");
let SubmitBtn = document.getElementById("submit");
let MessageRef = document.getElementById("message-ref");

let IsUsernameValid = () => {
  const UserNameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,32}/gi;
  return UserNameRegex.test(UserNameRef.value);
};

let IsPasswordValid = () => {
  const PasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  return PasswordRegex.test(PasswordRef.value);
};

UserNameRef.addEventListener("input", () => {
  if (!IsUsernameValid()) {
    MessageRef.style.visibility = "hidden";
    UserNameRef.style.cssText =
      "border-color: #fe2e2e; background-color: #ffc2c2";
  } else {
    UserNameRef.style.cssText =
      "border-color: #34bd34; background-color: #c2ffc2";
  }
});

PasswordRef.addEventListener("input", () => {
  if (!IsPasswordValid()) {
    MessageRef.style.visibility = "hidden";
    PasswordRef.style.cssText =
      "border-color: #fe2e2e; background-color: #ffc2c2";
  } else {
    PasswordRef.style.cssText =
      "border-color: #34bd34; background-color: #c2ffc2";
  }
});
SubmitBtn.addEventListener("mouseover", () => {
  //If either password or username is invalid then do this..
  if (!IsUsernameValid() || !IsPasswordValid()) {
    //Get the current position of submit btn
    let containerRect = document
      .querySelector(".container")
      .getBoundingClientRect();
    let submitRect = SubmitBtn.getBoundingClientRect();
    let offset = submitRect.left - containerRect.left;
    console.log(offset);
    //If the button is on the left hand side.. move it to the the right hand side
    if (offset <= 100) {
      SubmitBtn.style.transform = "translateX(16.25em)";
    }
    //Vice versa
    else {
      SubmitBtn.style.transform = "translateX(0)";
    }
  }
});
SubmitBtn.addEventListener("click", () => {
  MessageRef.style.visibility = "visible";
});
