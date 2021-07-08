#!/usr/bin/env node
const clipboard = require("clipboardy");
const chalk = require("chalk");
const program = require("commander");
const createPassword = require("./utils/create_password");
const savePassword = require("./utils/save_password");

program.version("1.0.0").description("A simple password generator cli");
program
  .option("-l, --length <number>", "length of password", "8")
  .option("-s, --save", "save password to password.txt")
  .option("-nn, --no-numbers", "remove numbers")
  .option("-ns, --no-symbols", "remove symbols")
  .parse();

const { length, save, numbers, symbols } = program.opts();

const generatedPassword = createPassword(length, numbers, symbols);
if (save) savePassword(generatedPassword);

clipboard.writeSync(generatedPassword);
// console.log(generatedPassword);
// console.log(chalk.yellow("Password copied to clipboard"));

console.log(chalk.blue("Generated password: ") + chalk.bold(generatedPassword));
console.log(chalk.yellow("Password copied to clipboard"));

module.exports = generatedPassword;
