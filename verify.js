const speakeasy = require("speakeasy");

const secret = "&<ud[b]mox389:?L0kUU}[/I1{NeB[><";

var isVerified = speakeasy.totp.verify({
  secret: secret,
  encoding: "ascii",
  token: "734108",
});

console.log(isVerified);
