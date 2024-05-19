const os = require("os");
const path = require("path");

console.log(os.arch());
console.log(os.cpus());
console.log(
  path.win32.basename(
    "./index.html"
  )
);
