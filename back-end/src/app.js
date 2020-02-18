import express from "express";
import connectDB from "./config/db";
import routes from "./routes";

connectDB();

const PORT = 3000;
const app = express();

app.use(express.json());

//  Routes
app.use("/", routes);

// Catch  404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render("error", {
    message: err.message
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
