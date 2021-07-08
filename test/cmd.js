const spawn = require("child_process").spawn;
const concat = require("concat-stream");
const { existsSync } = require("fs");

const PATH = process.env.PATH;

function createProcess(processPath, args = [], env = null) {
  if (!processPath || !existsSync(processPath))
    throw new Error("Invalid process path");

  args = [processPath].concat(args);

  return spawn("node", args, {
    env: Object.assign(
      {
        NODE_ENV: "test",
        preventAutoStart: false,
        PATH,
      },
      env
    ),
    stdio: [null, null, null, "ipc"],
  });
}

function execute(processPath, args = [], opts = {}) {
  const { env = null } = opts;
  const childProcess = createProcess(processPath, args, env);
  childProcess.stdin.setDefaultEncoding("utf8");

  const promise = new Promise((resolve, reject) => {
    childProcess.stderr.once("data", (err) => {
      reject(err.toString());
    });
    childProcess.on("error", reject);
    childProcess.stdout.pipe(
      concat((result) => {
        resolve(result.toString());
      })
    );
  });

  return promise;
}

module.exports = { execute };
