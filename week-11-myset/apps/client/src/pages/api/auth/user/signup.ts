// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { User } from "db";
import jwt from "jsonwebtoken";

type Data = {
  username: string;
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
  const { username, email, password } = req.body;
  let user = await User.findOne({ email });

  if (!username) {
    return res.status(400).json({ message: "Username can't be empty" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email can't be empty" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password can't be empty" });
  }

  if (user) {
    res
      .status(403)
      .json({ message: "User already exist, please login to continue" });
  } else {
    const obj = { username: username, email: email, password: password };
    const newUser = new User(obj);
    newUser.save();
    const token = jwt.sign({ email, role: "user" }, "SECRET", {
      expiresIn: "3h",
    });
    res.json({ message: "User registered successfully", token });
  }
}
