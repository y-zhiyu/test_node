let http = require("http");

// Server
http
  .createServer(function (req, res) {
    router(req, res);
  })
  .on("error", function (e) {
    console.log(e);
  })
  .listen(3000, "0.0.0.0");
let ts = new Date().toLocaleString({ timeZone: "Asia/Shanghai" });
console.debug(ts + ": server start... http://0.0.0.0:3000");

// Router
function router(req, res) {
  switch (req.url) {
    case "/":
      index(req, res); break;
    case "/cors":
      index(req, res); break;
    case "/cors/":
      index(req, res); break;
    case "/cors/simple_request":
      simple_request(req, res); break;
    case "/cors/preflight":
      preflight(req, res); break;
    case "/cors/credential":
      credential(req, res); break;
    case "/cors/credential_wrong":
      credential_wrong(req, res); break;
    default:
      // no action;
      res.end("...");
  }
}

// Biz logic
function index(req, res) {
  res.end('{"code":200,"msg":"test for cors ..."}');
}
function simple_request(req, res) {
  res.end('{"code":200,"msg":"test for cors (Simple requests) ..."}');
}
function preflight(req, res) {
  if (req.method == "OPTIONS") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.statusCode = 204;
    res.end("");
  } else {
    res.setHeader("Set-Cookie", "key_from_server_preflight=value_from_server1;");
    res.setHeader("Content-Type", "application/json");
    // res.setHeader('Access-Control-Allow-Credentials', 'false');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        code: 200,
        msg: "test for cors (Requests with preflight) ...",
        orgin: req.headers["origin"] ?? "null",
        cookie: req.headers["cookie"] ?? "null",
      })
    );
  }
}
function credential(req, res) {
  if (req.method == "OPTIONS") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", req.headers["origin"] ?? "null");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.statusCode = 204;
    res.end("");
  } else {
    res.setHeader("Set-Cookie", "key_from_server_credential=value_from_server2;");
    res.setHeader("Content-Type", "application/json");
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Access-Control-Allow-Origin", (req.headers["origin"] ?? "null"));
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        code: 200,
        msg: "test for cors (Requests with credentials) ...",
        orgin: req.headers["origin"] ?? "null",
        cookie: req.headers["cookie"] ?? "null",
      })
    );
  }
}
function credential_wrong(req, res) {
  if (req.method == "OPTIONS") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.statusCode = 204;
    res.end("");
  } else {
    res.setHeader("Set-Cookie", "key_from_server_credential=value_from_server2;");
    res.setHeader("Content-Type", "application/json");
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        code: 200,
        msg: "test for cors (Requests with credentials) ...",
        orgin: req.headers["origin"] ?? "null",
        cookie: req.headers["cookie"] ?? "null",
      })
    );
  }
}