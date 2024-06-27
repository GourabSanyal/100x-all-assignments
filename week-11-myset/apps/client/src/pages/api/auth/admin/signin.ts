// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin } from "db";
import jwt from "jsonwebtoken";

type Data = {
  email: string;
  password: string;
};

type responseData = {
  message: string;
  token?: string;
};

type ErrorObj = {
  message: string;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | responseData>
) {
  await ensureDbConnected();
  const { email, password } = req.body;

  if (!email){
    res.status(401).json({ message : "Email is required"})
  }
  if (!password){
    res.status(401).json({ message : "Password is required"})
  }

  let admin = await Admin.findOne({ email, password });

  if(admin) {
    const token = jwt.sign({email: email, role : "admin"},"SECRET",{
      expiresIn: "3h"
    } )
    res.status(200).json({ message: "Admin logged in", token})
  } else {
    res.status(403).json({ message : "Admin not found, please sign up to continue"})
  }
}
