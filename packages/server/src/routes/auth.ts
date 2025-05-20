import dotenv from "dotenv";
import express, {
  Request,
  Response,
  NextFunction
} from "express";
import jwt from "jsonwebtoken";
import credentials from "../services/credential-svc";

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "NOT_A_SECRET";
const router = express.Router();

// 🔐 Generate JWT token
function generateAccessToken(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token as string);
      }
    );
  });
}

// ✅ POST /auth/register
router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .create(username, password)
      .then((creds) => generateAccessToken(creds.username))
      .then((token) => res.status(201).send({ token }))
      .catch((err) =>
        res.status(409).send({ error: err.message || err })
      );
  }
});

// ✅ POST /auth/login
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .verify(username, password)
      .then((goodUser: string) => generateAccessToken(goodUser))
      .then((token) => res.status(200).send({ token }))
      .catch(() => res.status(401).send("Unauthorized"));
  }
});

// ✅ Middleware to protect API routes
export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).end(); // Unauthorized
  } else {
    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (decoded) next();
      else res.status(403).end(); // Forbidden
    });
  }
}

// ✅ Export routes for /auth
export default router;
