// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Course } from "db";

type Course = {
  _id: string; // You can adjust this type as needed
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

type ErrorObj = {
  message: string;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Course[] | ErrorObj>
) {
  try {
    await ensureDbConnected();
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      verifyTokenAndGetUser(token, async (user: string) => {
        if (!user) {
          const errorResponse: ErrorObj = {
            message: "Auth token expired",
            statusCode: 403,
          };
          res.status(403).json(errorResponse);
        } else {
          const courses: Course[] = await Course.find({});
          res.status(200).json(courses);
        }
      });
    } else {
      res.status(400).json({ message: "error", statusCode: 401 });
    }
  } catch (error) {
    console.log("error from api -> ", error);

    res.status(500).json({ message: "message", statusCode: 500 });
  }
}
