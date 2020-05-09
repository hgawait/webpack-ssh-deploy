import fs from "fs";
import archiver from "archiver";

function compressFile(targetDir, localFile) {
  return new Promise((resolve, reject) => {
    console.log("1-正在压缩文件...");
    let output = fs.createWriteStream(localFile);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });
    output
      .on("close", () => {
        resolve(
          console.log(
            "2-压缩完成！共计 " +
              (archive.pointer() / 1024 / 1024).toFixed(3) +
              "MB"
          )
        );
      })
      .on("error", (err) => {
        reject(console.error("压缩失败", err));
      });
    archive.pipe(output);
    archive.directory(targetDir, false);
    archive.finalize();
  });
}

export default compressFile;
