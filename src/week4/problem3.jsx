import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;
app.use(cookieParser());

app.get("/visit", (req, res) => {
  let count = req.cookies.visitCount;

  if (count) {
    count = parseInt(count) + 1;
  } else {
    count = 1;
  }
  res.cookie("visitCount", count, {
    httpOnly: true
  });

  res.json({
    message: `You have visited this page ${count} times`
  });
});

app.get("/reset", (req, res) => {
  res.clearCookie("visitCount");
  res.json({
    message: "Visit count reset"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});