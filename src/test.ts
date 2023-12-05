import { generateToken } from "./generate";
import { Role } from "./types";

const test = generateToken(
  {
    id: "test",
    roles: [Role.ADMIN],
    rateLimit: 9000,
  },
  process.env["JWT_SECRET"] as string
);

console.log('TEST TOKEN:', test)