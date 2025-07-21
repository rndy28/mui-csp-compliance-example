


const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();

// Middleware to generate nonce + set CSP
app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  // const nonce = "Shuz/Cgc+mJgcXuSwTAP0A==";
  res.locals.nonce = nonce;

  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}';`
  );

  next();
});

// Static files, but exclude index.html!
app.use((req, res, next) => {
  if (req.path === "/" || req.path === "/index.html") {
    return next(); // Skip static for index.html
  }
  express.static(path.join(__dirname, "build"))(req, res, next);
});

// Catch-all route for index.html (SPA)
app.get(/(.*)/, (req, res) => {
  const htmlPath = path.join(__dirname, "build", "index.html");
  let html = fs.readFileSync(htmlPath, "utf8");

  // Inject nonce into meta + script tag
  html = html.replace(/__NONCE__/g, res.locals.nonce);

  res.send(html);
});


// Listen on 8080 for Docker
app.listen(8080, "0.0.0.0", () => {
  console.log("Server is running");
});
