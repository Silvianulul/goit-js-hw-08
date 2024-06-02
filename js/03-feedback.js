import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;
const LOCAL_STORAGE_KEY = "feedback-form-state";

// Funcția pentru salvarea stării formularului
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formState));
}, 500);

// Funcția pentru încărcarea stării formularului
const loadFormState = () => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedState) {
    const { email, message } = JSON.parse(savedState);
    emailInput.value = email || "";
    messageTextarea.value = message || "";
  }
};

// Funcția pentru gestionarea evenimentului de trimitere a formularului
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

// Încărcați starea formularului la încărcarea paginii
document.addEventListener("DOMContentLoaded", loadFormState);

// Ascultă evenimentul de input și salvează starea formularului
form.addEventListener("input", saveFormState);

// Ascultă evenimentul de trimitere a formularului
form.addEventListener("submit", handleSubmit);
