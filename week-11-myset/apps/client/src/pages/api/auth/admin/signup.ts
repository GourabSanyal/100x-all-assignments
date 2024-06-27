// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin } from "db";
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

  if (!username) {
    return res.status(400).json({ message: "Username can't be empty" });
  }
  
  if (!email) {
    return res.status(400).json({ message: "Email can't be empty" });
  }
  
  if (!password) {
    return res.status(400).json({ message: "Password can't be empty" });
  }

  let admin = await Admin.findOne({ email });

  if (admin) {
    res.status(409).json({ message: `Admin ${username} already exist, please login to continue` });
  } else {
    const obj = { username: username, email: email, password: password };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign({ email, role: "admin" }, "SECRET", {
      expiresIn: "3h",
    });
    res.status(201).json({ message: `Admin ${username} created successfully`, token });
  }
}
