import helper from "./helper.js";
import compressFile from "./compressFile.js";
import connectServe from "./ssh.js";
import uploadFile from "./uploadFile.js";
import runCommand from "./handleCommand.js";
import formatStatus from "./formatStatus.js";
import path from "path";
import chalk from "chalk";
import { log, done } from "@vue/cli-shared-utils";
const __dirname = path.resolve();

// 可单独执行
async function main(config) {
  const SELECT_CONFIG = (await helper(config)).value;
  console.log("您选择了部署 " + SELECT_CONFIG.name);
  const curTime = new Date().toLocaleDateString().replace(/\//g, "");
  SELECT_CONFIG.targetFile = `crm_PC_${curTime}.zip`;
  const localFile = path.resolve(__dirname, "./" + SELECT_CONFIG.targetFile); // 待上传本地文件s
  SELECT_CONFIG.openCompress
    ? await compressFile(SELECT_CONFIG.targetDir, localFile)
    : ""; //压缩
  await connectServe(SELECT_CONFIG.ssh); // 连接
  await uploadFile(SELECT_CONFIG, localFile); // 上传
  await runCommand(
    "unzip " + SELECT_CONFIG.targetFile,
    SELECT_CONFIG.deployDir
  ); // 解压
  console.log("所有操作完成！");
  process.exit();
}

class WebpackDeploy {
  constructor(options) {
    this.config = options;
  }
  apply(compiler) {
    compiler.hooks.done.tap("WebpackDeploy", (stats) => {
      log(formatStatus(stats, "dist", process.cwd()));
      done(
        `Build complete. The ${chalk.cyan(
          "dist"
        )} directory is ready to be deployed.`
      );
      log(`\n=========发布========\n`);
      main(this.config);
    });
  }
}
export default WebpackDeploy;
