const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const retrieveAllPasswords = () => {
  fs.readFile(
    path.join(__dirname, "../", "passwords.txt"),
    "utf-8",
    (err, data) => {
      if (err) return console.log("Could not read file");
      //   console.log(data);
    }
  );
};

const retrievePassword = (appName) => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "../", "passwords.txt")),
    output: process.stdout,
    terminal: false,
  });

  readInterface.on("line", (line) => {
    if (line.split(": ")[0].trim() === appName) {
      console.log(
        chalk.blue(`The password for ${appName} is :`),
        chalk.bold(` ${line.split(": ")[1].trim()}`)
      );
      return;
    }
  });
};

// retrieveAllPasswords();

console.log("*****************************");

retrievePassword("appTech");
