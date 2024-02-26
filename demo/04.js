let http = require("http");

http
  .createServer(function (req, res) {
    router(req, res);
  })
  .on("error", function (e) {
    console.log(e);
  })
  .listen(3000, "0.0.0.0");

function router(req, res) {
  switch (req.url) {
  case "/":
    index(req, res);
    break;
  default:
    res.end("...");
  }
}

function index(req, res) {
  res.end('{"code":200,"msg":"hello world"}');
}