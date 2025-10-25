// src/services/authService.js

export const loginService = async (formData) => {
  // Example API call
  const res = await fetch("https://example.com/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const signupService = async (formData) => {
  const res = await fetch("https://example.com/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};
