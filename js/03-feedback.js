import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;
const LOCAL_STORAGE_KEY = "feedback-form-state";

const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formState));
}, 500);

const loadFormState = () => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedState) {
    const { email, message } = JSON.parse(savedState);
    emailInput.value = email || "";
    messageTextarea.value = message || "";
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formState);
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  form.reset();
};

document.addEventListener("DOMContentLoaded", loadFormState);

form.addEventListener("input", saveFormState);

form.addEventListener("submit", handleSubmit);
