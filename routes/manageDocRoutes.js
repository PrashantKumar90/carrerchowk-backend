const express = require("express");
const router = express.Router();
const CourseDocument = require("../models/CourseDocument");

router.post("/", async (req, res) => {
  try {
    const { courseName, semester } = req.body; 
    let query = {};
    if (courseName && courseName !== "All") {
      query.courseName = courseName;
    }
    if (semester && semester !== "All" && !isNaN(semester)) {
      query.semester = Number(semester);
    }
    console.log("Fetching documents with filter:", query);

    const documents = await CourseDocument.find(query).sort({ uploadedAt: -1 });

    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Server error while fetching documents" });
  }
});

// DELETE a document by ID
router.post('/delete', async (req, res) => {
  const { id } = req.body;  // The ID of the document to delete
  try {
    const result = await CourseDocument.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.json({ success: true, id });
    } else {
      res.status(404).json({ success: false, message: 'Document not found' });
    }
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
