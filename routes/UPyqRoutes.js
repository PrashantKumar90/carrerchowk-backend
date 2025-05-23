//this is for userconst express = require("express");
const router = express.Router();
const CourseDocument = require("../models/PYQModels");

//Admin Filter 

router.get("/user-pyq", async (req, res) => {
  const { course, semester } = req.query;

  try {
    const filter = {};

    if (course) filter.courseName = course;
    if (semester) filter.semester = Number(semester);

    const documents = await CourseDocument.find(filter);
    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;