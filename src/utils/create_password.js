const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-_=";

const createPassword = (length = 8, isNumbers = true, isSymbols = true) => {
  let chars = alpha;
  if (isNumbers) chars += numbers;
  if (isSymbols) chars += symbols;

  return generatePassword(length, chars);
};

const generatePassword = (length, chars) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

module.exports = createPassword;
