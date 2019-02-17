const express = require("express");
const app = express();

app.use(express.static(__dirname));
app.listen(5000);
console.log("server is running on 5000。");
