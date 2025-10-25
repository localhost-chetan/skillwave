export const validateForm = (form) => {
  const errors = {};

  if (!form.fullName) errors.fullName = "Full name is required";
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errors.email = "Valid email is required";
  if (!form.password || form.password.length < 6) errors.password = "Password must be at least 6 characters";
  if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
  if (!form.phoneNumber || !/^\d{10}$/.test(form.phoneNumber)) errors.phoneNumber = "Valid 10-digit phone number is required";
  if (!form.schoolName) errors.schoolName = "School name is required";
  if (!form.schoolLogo) errors.schoolLogo = "School logo is required";

  return errors;
};