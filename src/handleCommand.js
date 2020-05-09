import { ssh } from "./ssh.js";

// run linux shell
function runCommand(command, path) {
  return new Promise((resolve, reject) => {
    ssh
      .execCommand(command, {
        cwd: path,
      })
      .then((res) => {
        if (res.stderr) {
          reject(console.error("发生错误:" + res.stderr));
        } else {
          resolve(console.log(command + " 执行完成！"));
        }
      });
  });
}

export default runCommand;
