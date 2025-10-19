const express = require("express");
const notesRouter = express.Router();
const Notes = require("../models/notes");
const { UserAuth } = require("../middleware/auth");
const { AdminAccess } = require("../middleware/accessUser");

notesRouter.get("/", UserAuth, async (req, res) => {
  try {
    const notes = await Notes.find({ createdBy: req.user._id });
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

notesRouter.post("/addnote", UserAuth, async (req, res) => {
  try {
    const { heading, description, priority } = req.body;
    const note = new Notes({
      heading: heading,
      description: description,
      priority: priority,
      createdBy: req.user._id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

notesRouter.delete(
  "/deletenote/:id",
  UserAuth,
  AdminAccess,
  async (req, res) => {
    try {
      const noteId = req.params.id;

      if (req.adminAccess === true) {
        const note = await Notes.findByIdAndDelete(noteId);

        if (!note) {
          return res.status(404).json({ error: "Note not found" });
        }

        res
          .status(200)
          .json({ message: "Note deleted successfully", deletedNote: note });
      } else {
        res.status(403).json({ error: "Admin access required" });
      }
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ error: "Invalid Note ID format." });
      }

      console.error("Error deleting note:", err);
      res.status(500).json({ error: "Internal server error during deletion." });
    }
  },
);

notesRouter.get("/note-feed", UserAuth, async (req, res) => {
  try {
    const notes = await Notes.find({
      $and: [
        { createdBy: { $ne: req.userId } },

        {
          $or: [{ isPublic: true }, { privateAccess: req.userId }],
        },
      ],
    });
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = notesRouter;
