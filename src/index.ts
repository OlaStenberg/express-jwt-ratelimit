import "dotenv";
import express, { type Express, Request } from "express";
import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken";
import { Role, User } from "./types";

const JWT_SECRET = process.env["JWT_SECRET"] as string;
const PORT = (process.env["PORT"] as string) || "1337";

const decodeUser = (token: string | undefined): User | undefined => {
  if (!token) return undefined;
  let user = undefined;
  jwt.verify(token, JWT_SECRET, (err, result) => {
    if (!err && result) user = result as User;
  });
  return user;
};

async function main() {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  const app: Express = express();
  const limiter = rateLimit({
    max: (req: Request) => {
      const token = req.headers["authorization"]?.split(" ")[1];
      const user = decodeUser(token);
      if (user?.rateLimit) return user.rateLimit;
      if (user?.roles.includes(Role.ADMIN)) return 1000;
      if (user?.roles.includes(Role.BASIC)) return 300;
      return 60;
    },
    message: "Too many requests, please try again later.",
  });

  app.use(limiter);

  app.get("/", (_req, res) => {
    return res.json({ hello: "world" });
  });

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}

main();
