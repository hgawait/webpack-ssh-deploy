# webpack-ssh-deploy

a webpack ssh deploy plugin

## Usage

deploy-config.js

```js
module.exports = [
  {
    name: "",
    ssh: {
      host: "",
      port: ,
      username: "",
      password: ""
    },
    targetDir: "./dist",
    targetFile: "dist.zip",
    openCompress: true,
    openBackUp: false,
    deployDir: "",  // 发布路径
    releaseDir: "web"
  }
]
```

wepack.config.js

```js
const WebpackSshDeploy = require("webpack-ssh-deploy").default
module.exports = {
  ...
  plugins: [new WebpackSshDeploy(require("./deploy-config")), ...]
}
```
