// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { User } from "db";
import jwt from "jsonwebtoken";

type Data = {
  email: string;
  password: string;
};

type responseData = {
  message: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | responseData>
) {
  await ensureDbConnected();
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email can't be empty" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password can't be empty" });
  }
  let user = await User.findOne({ email });

  if (user) {
    if (password !== user.password) {
      return res.status(403).json({ message: "Access denied: Invalid password." });
    }
    const token = jwt.sign({ email: email, password: password }, "SECRET", {
      expiresIn: "3h",
    });
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(403).json({ message: "User doesn't exist. Signup to continue!" });
  }
}
