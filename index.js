const express = require("express");
const path = require("path");

const app = express();

let notes = [
  { id: 1, content: "is easy" },
  { id: 2, content: "avaScript" },
  {
    id: 3,
    content: "GET and POST",
  },
];

app.use("*", (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
});

app.use(express.static(path.join(__dirname, "/public")));

app
  .get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public/index.html"));
  })
  .get("/json", (request, response) => {
    response.json(notes);
  })
  .get(
    "/now",
    (request, response, next) => {
      request.time = new Date().toString();
      next();
    },
    (request, response) => {
      response.json({ time: request.time });
    }
  );

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
