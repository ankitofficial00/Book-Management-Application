import bookRoute from "./routes/book.route.js";
import cookieParser from "cookie-parser";
import express from "express";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// import  user routes

app.use("/api/v1/users", userRoute);

// import book routes

app.use("/api/v1/books", bookRoute);

export { app };
