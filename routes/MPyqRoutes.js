//manage pyq 
const express = require("express");
const router = express.Router();
const CourseDocument = require("../models/PYQModels");

// GET all documents (with optional filtering by courseName and semester)
router.post("/", async (req, res) => {
  try {
    const { courseName, semester, page = 1, limit = 5 } = req.body; // Pagination parameters
    let query = {};

    if (courseName && courseName !== "All") query.courseName = courseName;
    if (semester && semester !== "All") query.semester = Number(semester);

    // Get documents based on the query with pagination
    const documents = await CourseDocument.find(query)
      .skip((page - 1) * limit) // Skip the documents based on the page
      .limit(limit) // Limit the number of documents per page
      .sort({ uploadedAt: -1 }); // Sort by upload date descending

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
