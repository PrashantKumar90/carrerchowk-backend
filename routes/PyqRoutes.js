//upload pyqconst 
express = require("express");
const router = express.Router();
const CourseDocument = require("../models/PYQModels");

router.post("/uploadpyq", async (req, res) => {
  try {
    const { courseName, semester, subjectName, fileUrl } = req.body;

    if (!courseName || !semester || !subjectName || !fileUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doc = new CourseDocument({ courseName, semester, subjectName, fileUrl });
    await doc.save();

    res.status(201).json({ message: "Document uploaded", document: doc });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;