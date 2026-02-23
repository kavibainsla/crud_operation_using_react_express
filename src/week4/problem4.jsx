import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/login/admin", (req, res) => {
  res.cookie("role", "admin", { httpOnly: true });
  res.json({ message: "Admin LoggedIn" });
});


app.get("/login/client", (req, res) => {
  res.cookie("role", "client", { httpOnly: true });
  res.json({ message: "Client LoggedIn" });
});

const checkLogin = (req, res, next) => {
  const role = req.cookies.role;

  if (!role) {
    return res.status(401).json({ message: "Access Denied. Please Login" });
  }

  req.role = role;
  next();
};

app.get("/dashboard", checkLogin, (req, res) => {
  if (req.role === "admin") {
    res.json({ message: "Welcome Admin" });
  } else if (req.role === "client") {
    res.json({ message: "Welcome Client" });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("role");
  res.json({ message: "Logged out successfully" });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});