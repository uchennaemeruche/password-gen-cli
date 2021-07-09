const expect = require("chai").expect;
const cmd = require("./cmd");
const { EOL } = require("os");
const path = require("path");
const cliPath = path.join(__dirname, "../src/index.js");

describe("Passgen CLI", () => {
  it("should generate a password of 8 characters long", async () => {
    const response = await cmd.execute(cliPath);
    expect(
      response.trim().split(EOL).pop().split(":")[1].trim()
    ).to.have.lengthOf(8);
    // expect(
    //   response.trim().split(EOL).pop().split(/\r?\n/)[0].split(":")[1].trim()
    // ).to.have.lengthOf(8);
  });

  it("should generate a password of 10 characters long", async () => {
    const response = await cmd.execute(cliPath, ["--length=10"]);
    expect(
      response.trim().split(EOL).pop().split(/\r?\n/)[0].split(":")[1].trim()
    ).to.have.lengthOf(10);
  });

  it("should generate and save password", async () => {
    const response = await cmd.execute(cliPath, ["-s"]);
    expect(response.trim()).to.include("Password saved to password.txt");
  });

  // it("should copy password to clipboard", async () => {
  //   const response = await cmd.execute(cliPath);
  //   expect(response.trim().split(EOL).pop().split(/\r?\n/)[1]).to.match(
  //     /^Password copied to clipboard/
  //   );
  // });

  it("should return a friendly message if an unknown option is passed", async () => {
    try {
      await cmd.execute(cliPath, ["-u"]);
    } catch (error) {
      expect(error.trim()).to.include("unknown option");
    }
  });
});
