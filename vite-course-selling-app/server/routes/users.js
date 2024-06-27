/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const express = require("express");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjFAMS5pbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkyNjI1ODk4LCJleHAiOjE2OTI2Mjk0OTh9.tImzd_Fmj1EjMbkbrucmuTNtbyjEFCzedwCA2iqtvIA

// logic to sign up user
router.post("/signup", async (req, res) => {
  const { username, password } = req.headers;
  const user = await Course.findOne({ username, password });
  if (user) {
    res.json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User signed up successfully", token });
  }
});

// login user
router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  console.log(req.headers);
  // const user = await User.findOne({ username });
  // if (user) {
  //   const token = jwt.sign({ username, role: "user" }, SECRET, {
  //     expiresIn: "1h",
  //   });
  //   res.json({ message: "User logged in succesfully", token });
  // } else {
  //   res.status(403).json({ message: "User authentication failed", token });
  // }
});

// list all courses
router.get('/courses', authenticateJwt, async(req, res) => {
     const courses = await Course.find({});
     res.json({ courses })
})

// purchase a course
router.post("/courses/:courseId", authenticateJwt, async(req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
      // console.log(User);
      const user = await User.findOne({ username: req.headers.username });
      // console.log(req.headers);
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: "Course purchased successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Course not found" });
    }
})

// list purchased courses
router.get("/purchasedCourses", authenticateJwt, async(req, res) => {
    // console.log(req.user)
    const user = await User.findOne({ username: req.user.username }).populate(
        "purchasedCourses"
      );
      if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
      } else {
        res.status(403).json({ message: "No courses purchased" });
      }
})

module.exports = router;
