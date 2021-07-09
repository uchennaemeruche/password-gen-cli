const fs = require("fs");
const path = require("path");
const os = require("os");
const chalk = require("chalk");

const writeToFile = (password, appName) => {
  const data = `${appName}: ${password}`;
  fs.open(
    path.join(__dirname, "../", "passwords.txt"),
    "a",
    666,
    (event, id) => {
      fs.write(id, data + os.EOL, "utf-8", () => {
        fs.close(id, () => {
          console.log(chalk.green("Password saved to password.txt"));
        });
      });
    }
  );
};

const savePassword = async (password, appName = "Default") => {
  writeToFile(password, appName);
  const admin = require("firebase-admin");

  const serviceAccount = require("../../passgen-3ff24-firebase-adminsdk-j29pf-18ec78732e.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  try {
    const db = admin.firestore();
    await db.collection("credentials").doc(appName).set({ appName, password });
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = savePassword;
