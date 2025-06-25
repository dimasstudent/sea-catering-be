import bcrypt from "bcrypt";
import jwtConfig from "../config/config.js";
import prisma from "../config/prismaClient.js";
import jwt from "jsonwebtoken";

async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json("Email already is exists");
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );

    res.status(201).json({ token});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "User registration failed." });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // verivikasi password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

export const authController = { register, login };
