const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

require("dotenv").config();
// console.log(process.env.MONGO_URI);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
  );
  
  
  // app.set("trust proxy", 1); // trust first proxy
  app.use(cookieParser());
  app.use(morgan("dev"));
  
  require("./utils/db")();




app.use(
  session({
    name: "producthub.sid",
    secret: "productHub",
    saveUninitialized: true,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
    },
  })
);
console.log("incoming ..")

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/cart", require("./routes/cartRoute"));

app.use(require("./middlewares/error"));
app.listen(8000, () => console.log("server listening on port 8000"));
