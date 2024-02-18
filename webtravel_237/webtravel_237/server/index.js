const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const imageRoute = require("./routes/images");
const commentRoute = require("./routes/comments");
const cors = require("cors");

dotenv.config();
app.use(express.json()); //for enabling of sending json objects
//app.use(express.urlencoded({ useNewUrlParser: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());

const URI = process.env.MONGO_URL;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute); //mounting routes in auth router on /api/auth
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/upload", imageRoute);
app.use("/api/comments", commentRoute);

app.get("/", (req, res) => {
  res.send("Kenans");
});

app.listen("5000", () => {
  console.log("listening on port 5000");
});
