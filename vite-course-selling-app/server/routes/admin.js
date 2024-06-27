/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const express = require("express");
const { Course, Admin } = require("../db/index");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ message: "Admin dosent exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

// admin signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, password }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin signup successful", token });
  }
});

// admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Admin logged in successfully", token });
  } else {
    res.status(403).json({ message: "Addmin login failed" });
  }
});

// admin create a course
router.post("/courses", authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course added succesfully", courseId: course.id });
});

//admin update a course
router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (!course) {
    res.status(400).json({ message: "Course is not found" });
  } else {
    res.json({ message: "Course updated successfully" });
  }
});

// admin get all courses

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

router.get("/course/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

module.exports = router;
